import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import {Form, Button, InputGroup, Container} from 'react-bootstrap';
import Link from 'next/link';


const AccountsCreate = () => {
    const [companyName, setCompany] = useState('');
    const [gameName, setGame] = useState('');
    const [paymentAmount, setAmount] = useState('');
    const [currency, setCurrency] = useState('');    

    const router = useRouter();

    const changeCompanyName = (e) => {
        const currentCompany = e.target.value;
        setCompany(currentCompany);
    };
    const changeGameName = (e) => {
        const currentGame = e.target.value;
        setGame(currentGame);
    };
    const changeAmount = (e) => {
        const currentAmount = e.target.value;
        setAmount(currentAmount);
    };
    const changeCurrency = (e) => {
        const currentCurrency = e.target.value;
        setCurrency(currentCurrency);
    };

    const handleCreate = async () => {
        const data = new FormData();
        let payment;
        let paymentData;
        try {
            if (paymentAmount !== "") {
                payment = "Paid";
                paymentData = new Date().toISOString();
            } else {
                payment = "Not Paid";
                paymentData = "";
            }
            const newProduct = {
                companyName,
                gameName,
                paymentAmount,
                currency,
                payment,
                paymentData
            };    
            await axios.post(`http://localhost:3005/api/`, newProduct)
            .then((res) => {
                router.reload();
            })
        } catch (err) {
            console.log(err);
        }
    };


    

    return (
        <div style={{margin: "0 auto"}}>   
        <Container fluid="md" >    
        <InputGroup style={{ width: '20%', margin: '0 auto'}}>
            <h2 >Add new Account</h2>
        </InputGroup> 
    <div style={{display: "flex"}}>
        <InputGroup className="mb-3" style={{ width: '20%', bottom: '30px'}}>
            <Form.Select aria-label="Default select example" style={{ width: '20%', top: '30px'}}
                onChange={(e) => changeCompanyName(e)}
            >
                <option value="" selected disabled hidden>Change Company</option>
                <option Value="Company1">Company1</option>
                <option value="Company2">Company2</option>
                <option value="Company3">Company3</option>
            </Form.Select>
        </InputGroup>
        <InputGroup className="mb-3" style={{ width: '20%', left: '20px'}}>
            <Form.Control 
            placeholder="Game Name"
            aria-label=""
            type="string"
            onChange={(e) => changeGameName(e)}
            aria-describedby="basic-addon1"
            />
        </InputGroup>
        <InputGroup className="mb-3" style={{ width: '20%', left: '40px'}}>
            <Form.Control 
            placeholder="Amount"
            aria-label=""
            type="number"
            onChange={(e) => changeAmount(e)}
            aria-describedby="basic-addon1"
            />
        </InputGroup>
        <InputGroup className="mb-3" style={{ width: '16%', bottom: '30px', left: '60px'}}>
            <Form.Select aria-label="Default select example" style={{ width: '20%', top: '30px'}}
            onChange={(e) => changeCurrency(e)}
            >
                <option value="" selected disabled hidden>Change Currency</option>
                <option value="$">$</option>
                <option value="€">€</option>
            </Form.Select>
        </InputGroup>
    </div>
        <InputGroup className="mb-4" style={{ width: '20%', margin: '0 auto'}}>
                <Link href="/" style={{color: "red", textDecoration: "none", width: "40px"}}>
                    <Button variant="outline-success" id="button-addon1" style={{ width: '150px'}} 
                        onClick={handleCreate}
                    >
                        Create account
                    </Button>
                    <Button variant="outline-dark" id="button-addon1" style={{ width: '150px', top: '20px'}}
                    >
                        Back
                    </Button>
                </Link>
        </InputGroup>
        </Container>   
    </div>
    )
}
export default AccountsCreate;