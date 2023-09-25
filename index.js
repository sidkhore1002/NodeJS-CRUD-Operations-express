const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const port = 4500;

app.use(bodyParser.json())

// --- Listen to port --- 
app.listen(port, () => {
    console.log('Server running at http://localhost:'+port);
});

// --- data ---
const employees = [
    {"empId":1, "empName":"sid", "empAddress":"pune"},
    {"empId":2, "empName":"siddharth", "empAddress":"mumbai"},
    {"empId":3, "empName":"sk", "empAddress":"pune"},
];

// --- get all emp data ---
app.get('/emp', (req,res)=>{
    res.json(employees);
});

// --- get emp by id ---
app.get('/emp/:id', (req,res)=>{
    const emp = employees.find((emp) => emp.empId=== parseInt(req.params.id));
    if(!emp){
        res.status(404).send('Emp not found');
    }
    res.json(emp);
});

// --- add new emp ---
app.post('/emp', (req,res)=>{
    const newEmp = {
        "empId" : employees.length + 1,
        "empName" : req.body.empName,
        "empAddress" : req.body.empAddress
    };
    employees.push(newEmp);
    res.json(newEmp);
    console.log(employees)
});

// --- update emp ---
app.put('/updateemp/:id', (req,res)=>{
    const emp = employees.find((emp) => emp.empId=== parseInt(req.params.id));
    if(!emp){
        res.status(404).send("emp not found")
    } 
    emp.empName = req.body.empName;
    emp.empAddress = req.body.empAddress;
    console.log(employees)
    res.json(emp)
});


// --- Delete emp ---
app.delete('/deleteemp/:id', (req,res)=>{
    const emp = employees.find((emp) => emp.empId=== parseInt(req.params.id));
    if(!emp){
        res.status(404).send("emp not found")
    } 
    const indexToBeDelete = employees.indexOf(emp);
    employees.splice(indexToBeDelete, 1);
    console.log(employees)
    res.json(emp)
});
