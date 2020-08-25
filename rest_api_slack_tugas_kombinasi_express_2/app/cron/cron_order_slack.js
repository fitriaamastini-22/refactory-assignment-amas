require('dotenv').config();
const db = require("../models/index");
const User = db.users;
const Order = db.orders;
const { QueryTypes } = require('sequelize');
const { sequelize } = require('../models/index');
const slack = require("../slack/it.slack");

module.exports = async nodemailer =>{
    let message_slack = "";
    await sequelize.query("SELECT * from users WHERE id = ':id_user'",{replacements:{ id_user : 1},type: QueryTypes.SELECT})
        .then(async (users)=>{
            for (const key in users) {
                if (users.hasOwnProperty(key)) {
                    let month = ''
                    const today      = new Date();
                    const year       = today.getFullYear();
                    const mes        = today.getMonth()+1;
                    if (mes.toString.length == 1){
                        month = '0'+mes
                    }else{
                        month = mes
                    }
                    const day        = today.getDate()-1;
                    const time_start = year+"-"+month+"-"+day;
                    const user = users[key];
                    
                    await  sequelize.query("SELECT firstname, lastname, tanggal, SUM(harga) as total_harga FROM orders JOIN users ON users.id = orders.id_user WHERE id_user = :id_user AND tanggal = :tanggal",
                    {
                        replacements: {id_user:user.id,
                                       tanggal:time_start},
                        type: QueryTypes.SELECT
                    }).then((data)=>{
                        message_slack += `User ${data[0].firstname} ${data[0].lastname} | Total Belanja (Rp) : ${data[0].total_harga} \r\n`;
                    })
               }
            }

            slack.sendMessage("Admin","tik",message_slack);
        })
    
}