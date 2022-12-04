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
            // let searchName = req.body
            let companies = await AccountModel.find();  
            const test = companies.filter(item => item.companyName == req.body.searchName);
            

            // let test = companies.filter(function(company) {
            //     return company.companyName.includesCase(searchName)
            // });
            return res.json(test)
        } catch (e) {
            console.log(e)
            next(e.message)
        }
    }


    async updateAcc (req, res, next) {
        try {
            // let _id = "638cddb5ea80441677d3d933";
            let { _id } = req.params            
            const post = await AccountModel.findById(_id)
            post.payment = "Paid"
            await post.save()
            return res.json(post)
        } catch (e) {
            console.log(e)
            next(e.message)
        }
    }  


}


export default new AccountController()