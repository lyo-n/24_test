import AccountModel from '../models/Accounts.js';


class AccountController {
    async create (req, res, next) {
        try {
            let {companyName, gameName, paymentAmount, currency, payment, paymentData} = req.body         
            const acc = await AccountModel.create({companyName, payment, gameName, paymentAmount, currency, paymentData});
            return res.json(acc)
        } catch (e) {
            console.log(e)
            next(e.message)
        }    
    }

    async getAll (req, res, next) {
        try {
            let accounts;
            accounts = await AccountModel.find().sort('+acc_id')
                return res.json(accounts)
        } catch (e) {
            console.log(e)
            next(e.message)
        }
    }

    async getCompanies (req, res, next) {
        try {
            let companies = await AccountModel.find();  
            const test = companies.filter(item => item.companyName == req.body.searchName);
            return res.json(test)
        } catch (e) {
            console.log(e)
            next(e.message)
        }
    }


    async updateAcc (req, res, next) {
        try {
            let { _id } = req.params            
            const post = await AccountModel.findById(_id)
            post.payment = "Paid"
            post.paymentAmount = 5;
            post.paymentData = new Date().toISOString();
            if (post.currency == "") {
                post.currency = "$";
            }
            await post.save()
            return res.json(post)
        } catch (e) {
            console.log(e)
            next(e.message)
        }
    }  

    async delete (req, res, next) {
        try {
            let {_id} =  req.params
            const item = await AccountModel.findById(_id)
            await item.deleteOne()
            return res.json({message: `Рахунок видалено`})
        } catch (e) {
            сonsole.log(e)
            next(e.message)
        }
    }

}


export default new AccountController()