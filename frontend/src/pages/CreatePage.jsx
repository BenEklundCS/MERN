import React from 'react';
import { Container, VStack, Heading, useColorModeValue, Box, Input, Button, useToast } from '@chakra-ui/react';
import { useProductStore } from '../../store/product';
import { set } from 'mongoose';

const CreatePage = () => {
  const [newProduct, setNewProduct] = React.useState({
    name: "",
    price: "",
    image: "",
  });

  const toast = useToast();

  const { createProduct } = useProductStore(); // Destructure createProduct from the hook

  // Function to handle adding a product
  const handleAddProduct = async () => {
    const { success, message } = await createProduct(newProduct); // Await the async function
    // If there is an error creating the product
    if (!success) {
      // Show an error toast popup from Chakra UI
      toast({
        title: "Error creating product",
        description: message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
    else {
      // Else show a success toast popup from Chakra UI
      toast({
        title: "Product created",
        description: message,
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    }
    setNewProduct({ name: "", price: "", image: "" }); // Reset the newProduct state
  };

  return (
    <div>
      <Container maxW={"container.sm"}>
        <VStack spacing={8}>
          <Heading as={"h1"} size="2xl" textAlign={"center"} mb={8}>
            Create new product
          </Heading>
          <Box w={"full"} bg={useColorModeValue("white", "gray.800")} p={6} rounded={"lg"} shadow={"md"}>
            <VStack spacing={4}>
              <Input
                placeholder="Product name"
                name="name"
                value={newProduct.name}
                onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
              />
              <Input
                placeholder="Product price"
                name="price"
                type="number"
                value={newProduct.price}
                onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
              />
              <Input
                placeholder="Image URL"
                name="image"
                value={newProduct.image}
                onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
              />
              <Button colorScheme="blue" onClick={handleAddProduct} w="full">
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