
// This is the main page of the inventory management app

'use client' // This is a client component

import { useState, useEffect } from "react";
import { firestore } from '@/firebase'; //database
import { Box, Button } from "@mui/material";
import { Typography } from "@mui/material";
import { query } from "firebase/firestore";
import { collection, getDocs } from "firebase/firestore";
import { TextField } from "@mui/material";
import { Stack } from "@mui/material";
import { Modal } from "@mui/material";
import { doc, setDoc, getDoc, updateDoc, deleteDoc } from "firebase/firestore";

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'white',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  display: 'flex',
  flexDirection: 'column',
  gap: 3,
}

export default function Home() {

  // Contains state variables and helper functions
  // Inventory: An arrat that stores the inventory items. It is fetched from the Firestore database
  const [inventory, setInventory] = useState([]); // This is the inventory state

  // Open: A boolean to control the visibility of the modal, usef for adding new items
  const [open, setOpen] = useState(false); // This is the portal state. Default is false

  // setItemName: A state variable to store the item name
  const [itemName, setItemName] = useState(''); // This is the item name state

  // function to add an item to the inventory
  const addItem = async (item) => { 
    const docRef = doc(collection(firestore, 'inventory'), item); // create a new document in the inventory collection
    const docSnap = await getDoc(docRef); // get the document
    if (docSnap.exists()) { // if the document exists
      const { quantity } = docSnap.data(); // get the quantity
      await setDoc(docRef, { quantity: quantity + 1 }); // update the quantity
    }
    else { // if the document does not exist
      await setDoc(docRef, { quantity: 1 }); // create a new document with quantity 1
    }
    await updateInventory(); // update the inventory
  }
  const removeItem = async(item) =>{
    const docRef = doc(collection(firestore, 'inventory'), item); // create a new document in the inventory collection
    const docSnap = await getDoc(docRef); // get the document
    if(docSnap.exists()){ // if the document exists
      const {quantity} = docSnap.data();
      if (quantity === 1){
        await deleteDoc(docRef);
      }
      else{
        await setDoc(docRef, { quantity: quantity - 1 }); // update the quantity
      }
    }
    await updateInventory(); 
  }

  const updateInventory = async () => { // function to update the inventory
    const snapshot = query(collection(firestore, 'inventory')); // query the inventory collection
    const docs = await getDocs(snapshot); // get the documents
    const inventoryList = [];
    docs.forEach((doc) => { // add every doc to the inventory list
      inventoryList.push({
        name: doc.id,
        ...doc.data()
      });
    });
    
    setInventory(inventoryList);
    

  }

  // The useEffect hook calls updateInventory when the component is mounted. 
  // Ensures that inventory list is populated with the latest data from the Firestore database
  useEffect(() => { // runs the updateInventory function when the component is mounted
    updateInventory();
  }, []);


  const handleOpen = () => setOpen(true); // function to open the modal
  const handleClose = () => setOpen(false); // function to close the modal

  // The main component that renders the inventory items and the modal
  /*
  - Model that allows the user to add new items to the inventory
  - Button that opens the modal
  - Box that contains the inventory items

  
  */
  return(
  <Box 
    width="100vw" 
    height="100vh" 
    display="flex" 
    flexDirection="column" 
    alignItems="center" 
    justifyContent="center"
    gap={2}> 

  
  <Modal open={open} onClose={handleClose}> 
    <Box
      sx={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'white',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
        display: 'flex',
        flexDirection: 'column',
        gap: 3,
      }}
    >
      <Typography variant="h6">Add Item</Typography>
      <Stack width="100%" direction="row" spacing={2}>
        <TextField
        variant='outlined'
        fullWidth
        value={itemName}
        onChange={(e) => setItemName(e.target.value)} />

        <Button
          variant="contained"
          onClick={() => {
            addItem(itemName)
            setItemName('')
            handleClose()
            }}
            >
            Add Item
        </Button>
      </Stack>
    </Box> 
  </Modal>

  <Button
        variant="contained"
        onClick={()=>{
          handleOpen()
        }}
        >
          Add New Item
        </Button>
        
        <Box boarder="1px solid #333">
          <Box 
          width = "800px" 
          height = "100px" 
          bgcolor = "#ADD8E6"
          display="flex"
          alignItems="center" 
          justifyContent="center">
            
            <Typography variant = 'h2' color = '#333'>
              Inventory items
            </Typography>
          </Box>
        
        <Stack width="100%" height="300px" spacing={2} overflow="auto">
          {
          inventory.map(({name, quantity}) => (
            <Box 
            key={name} 
            width = "100%" 
            minHeight = "150px" 
            display = "flex"
            alignItems="center"
            justifyContent="space-between"
            bgColor = '#f0f0f0'
            padding = {5}
            >
              <Typography 
              variant = 'h3' 
              color = '#333' 
              textAlign = 'center'  
              >
                {name.charAt(0).toUpperCase() + name.slice(1)}
              </Typography>


              <Typography 
              variant = 'h3' 
              color = '#333' 
              textAlign = 'center'  
              >
                {quantity}
              </Typography>
              <Stack direction="row" spacing={2}>
              <Button
              variant="contained"
              onClick={() => addItem(name)}
              >
                Add
              </Button>
              <Button
              variant="contained"
              onClick={() => removeItem(name)}
              >
                Remove
              </Button>
              </Stack>
            </Box>
          ))}
        </Stack>
      </Box>
    </Box>
    
  )
}


// 13:09
