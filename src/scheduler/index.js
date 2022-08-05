import cron from 'node-cron'
import { User, Queue, sequelize, Sequelize } from '../models';
import { checkIfToday, addTime, isBirthdayDayPassed, shouldSendMessage } from '../helpers'
import axios from 'axios'

// Cron job for queuing users that has his birthday by today
cron.schedule('* 0 * * * *', async () => {
    let allUsers = await User.findAll({
        attributes: {
            exclude: ['createdAt', 'updatedAt', 'location']
        },
        where: {
            isProcessed: false
        },
        raw: true
    })

    allUsers = allUsers.filter((user) => checkIfToday(user.birthdayDate))

    if(allUsers.length == 0) return

    let transaction = await sequelize.transaction();

    try {
        allUsers.map(async (user) => { await Queue.create({
            name: `${user.firstName} ${user.lastName}`,
            email: user.email,
            birthdaySendTime: addTime(user.birthdayDate, 9)
        }, transaction)
        })

        await User.bulkCreate(
            allUsers.map((user) => {
                return {
                ...user,
                isProcessed: true
                }
            }),
            {
            updateOnDuplicate: ["isProcessed"],
            },
            transaction
        );
        await transaction.commit()
    }catch (error) {
        await transaction.rollback()
    }
});

// Cron job for sending the message to users
cron.schedule('* 0,30 * * * *', async () => {
    const { Op } = Sequelize
    let allQueue = await Queue.findAll({
        where: { [Op.not]: {
            status: "SENT"
        } }
    })

    allQueue = allQueue.filter((queue) => shouldSendMessage(queue.birthdaySendTime, queue.status))

    for (const queue of allQueue) {

        const payload = {
            email: queue.email,
            message: `Hey, ${queue.name} it's your birthday`
        }

        try {
            const response = await axios.post("https://email-service.digitalenvision.com.au/send-email", payload)
            if(response.status == 200) {
                await queue.update(
                    { status: "SENT" }, 
                    { where: { email: queue.email } })
            }
        } catch(error) {
            await queue.update(
                { status: "FAILED" }, 
                { where: { email: queue.email } })
        }
    }
});

// Cron job for housekeeping and update user status
cron.schedule('* 30 * * * *', async () => {
    let allQueue = await Queue.findAll({
        where: { status: "SENT" }
    })

    allQueue = allQueue.filter((queue) => isBirthdayDayPassed(queue.birthdaySendTime))

    let transaction
    for (const queue of allQueue) {
        try {
            transaction = await sequelize.transaction()
            await User.update(
                {
                    isProcessed: false
                }, 
                {
                    where: {
                        email: queue.email
                    }
                }, transaction
            )
            await Queue.destroy({ where: { email: queue.email }, transaction})
            await transaction.commit()
        } catch(error) {
            console.log(error)
            await transaction.rollback()
        }
    }
});