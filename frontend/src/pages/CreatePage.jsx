// src/pages/CreatePage.jsx
import React from 'react';
import { Container, VStack, Heading, useColorModeValue, Box, Input, Button } from '@chakra-ui/react';
import { useProductStore } from '../../store/product';

const CreatePage = () => {
  const [newProduct, setNewProduct] = React.useState({
    name: "",
    price: "",
    image: "",
  });

  const createProduct = useProductStore();
  const handleAddProduct = async() => {
    const {success, message} = createProduct(newProduct);
    console.log("success", success, message);
  }

  return (
    <div>
      <Container maxW={"container.sm"}>
        <VStack spacing={8}>

          <Heading as={"h1"} size="2x1" textAlign={"center"} mb={8}>
            Create new product
          </Heading>

          <Box w={"full"} bg={useColorModeValue("white", "gray.800")}
            p = {6} rounded = {"lg"} shadow = {"md"}>

            <VStack spacing={4}>
              <Input
                placeholder="Product name"
                name="name"
                value={newProduct.name}
                onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
              />
              <Input
                placeholder="Product price"
                name="name"
                type='number'
                value={newProduct.price}
                onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
              />
              <Input
                placeholder="Image URL"
                name="image"
                value={newProduct.image}
                onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
              />
              <Button colorScheme="blue" onClick={handleAddProduct} w='full'>
                Add Product 
              </Button>
            </VStack>

          </Box>

        </VStack>
      </Container>
    </div>
  );
};

export default CreatePage;