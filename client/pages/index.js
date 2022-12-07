import Link from 'next/link';
import axios from "axios";
import {useState, useEffect} from 'react';
import {Form, Button, InputGroup, Table, Container} from 'react-bootstrap';
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { getAllAccounts } from "../state/actions/accountsAction";

const Accounts = () =>  {
    const [query, setQuery] = useState('');
    const router = useRouter();

    const accountsData = useSelector((state) => state?.accounts?.accountsData);
    const dispatch = useDispatch();

    const fetchFootballers = async () => {
        await axios.get("https://two4-server.onrender.com/api/accounts")
        .then((res) => {
            dispatch(getAllAccounts(res.data))
        })
    }

    useEffect(() => {
      fetchFootballers()
    },[])

    const handlePaid = async (_id) => {
      await axios.get(`http://localhost:3005/api/${_id}`)
          .then((res) => {
            router.reload();
          })
  }

  const handleDelete = async (_id) => {
    await axios.delete(`http://localhost:3005/api/${_id}`)
        .then((res) => {
          router.reload();
        })
}

    const searchFilter = (accountsData) => {
    return accountsData?.filter(
      (el) => el.companyName.includes(query)
    )
    }
    const filtered = searchFilter(accountsData)

    return (
        <div>
          <Container fluid="md">
          <InputGroup style={{ width: '10%', margin: '0 auto'}}>
            <h2>Accounts</h2>
          </InputGroup> 
            <InputGroup className="mb-3" style={{ width: '34%', margin: '0 auto'}}>
                <Form.Control
                  aria-label="Example text with button addon"
                  aria-describedby="basic-addon1"
                  placeholder="Search company"
                  value={query}
                  onChange = {(e) => setQuery(e.target.value)}
                />
            </InputGroup>
            <Table style={{ width: '75%', margin: '0 auto'}} striped bordered hover variant="dark">
              <thead>
                <tr>
                  <th>№</th>
                  <th>Company Name</th>
                  <th>Game Name</th>
                  <th>Payment Amount</th>
                  <th>Currency</th>
                  <th>Payment</th>
                  <th>Created</th>
                  <th>Payment Data</th>
                  <th>Click Paid</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {filtered?.map((item)=> (
                <tr key={item.acc_id}
                >
                  <td>{item.acc_id}</td>
                  <td>{item.companyName}</td>
                  <td>{item.gameName}</td>
                  <td>{item.paymentAmount}</td>
                  <td>{item.currency}</td>
                  <td>{item.payment}</td>
                  <td>{item.paymentData}</td>
                  <td>{item.createdAt}</td>
                  <td>
                    {item.paymentAmount !== "" ?
                      <p>Paid</p>
                  : 
                      <Button variant="success" id="button-addon1" style={{width: '80px'}}
                      
                      onClick={()=> handlePaid(item._id)}
                      >
                        Pay
                      </Button>
                    }
                  </td>
                  <td>
                      <Button variant="danger" id="button-addon1" style={{width: '80px'}}
                      onClick={()=>handleDelete(item._id)}
                      >
                        Delete
                      </Button>
                  </td>
                </tr>
              ))}
              </tbody>
            </Table>   
            <InputGroup className="mb-3" style={{ width: '20%', margin: '0 auto', top: '30px'}}>
                <Link href="/accounts">
                  <Button variant="outline-dark" id="button-addon1" style={{ width: '150px'}}>
                      Create account                  
                  </Button>
                </Link>
            </InputGroup>
            </Container>
        </div>
    )
}


export default Accounts;

