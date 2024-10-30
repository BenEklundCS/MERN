import { Box, IconButton, Image, Heading, Text, HStack, useToast, useColorModeValue, 
    Modal, ModalOverlay, ModalContent, useDisclosure, ModalCloseButton, ModalHeader, ModalBody, Input, VStack, 
    Button, ModalFooter} from '@chakra-ui/react';
import { EditIcon, DeleteIcon } from 'lucide-react';
import { useProductStore } from '../../store/product';
import { ModuleCacheMap } from 'vite/runtime';
import { useState } from 'react';

const ProductCard = ({ product }) => {
    const [updatedProduct, setUpdatedProduct] = useState(product);
    const textColor = useColorModeValue('gray.600', 'gray.200');
    const bg = useColorModeValue('white', 'gray.800');
    const { deleteProduct, updateProduct } = useProductStore();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const toast = useToast();

    const handleDeleteProduct = async (pid) => {
        const { success, message } = await deleteProduct(pid);
        toast({
            title: success ? 'Success' : 'Error',
            description: message,
            status: success ? 'success' : 'error',
            duration: 3000,
            isClosable: true
        });
    };

    const handleUpdate = async (pid) => {
        const { success, message } = await updateProduct(pid, updatedProduct);
        toast({
            title: success ? 'Success' : 'Error',
            description: message,
            status: success ? 'success' : 'error',
            duration: 3000,
            isClosable: true
        });
        onClose();
    }
    

    return (
        <Box
            shadow={'lg'}
            rounded={'lg'}
            overflow={'hidden'}
            transition={'all 0.3s'}
            _hover={{ transform: "translateY(-5px)", shadow: "xl" }}
            bg={bg}
        >
            <Image src={product.image} alt={product.name} h={48} w='full' objectFit='cover' />

            <Box p={4}>
                <Heading as='h3' size='md' mb={2}>
                    {product.name}
                </Heading>

                <Text fontWeight='bold' fontSize='xl' color={textColor} mb={4}>
                    ${product.price}
                </Text>

                <HStack spacing={2}>
                    <IconButton icon={<EditIcon />} onClick={onOpen} colorScheme='blue' />
                    <IconButton icon={<DeleteIcon />} onClick={() => handleDeleteProduct(product._id)} colorScheme='red' />
                </HStack>
            </Box>

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Update Product</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <VStack spacing={4}>
                            <Input 
                                placeholder='Product Name' 
                                name='name' 
                                value={updatedProduct.name} 
                                onChange={(e) => setUpdatedProduct({ ...updatedProduct, name: e.target.value})}/>
                            <Input 
                                placeholder='Price' 
                                name='price' 
                                type='number'
                                value={updatedProduct.price} 
                                onChange={(e) => setUpdatedProduct({ ...updatedProduct, price: e.target.value})}/>
                            <Input 
                                placeholder='Image URL' 
                                name='Image' 
                                value={updatedProduct.image} 
                                onChange={(e) => setUpdatedProduct({ ...updatedProduct, image: e.target.value})}/>
                        </VStack>
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme='blue' mr={3} onClick={() => handleUpdate(product._id)}>Update</Button>
                        <Button varient='ghost' onClick={onClose}>Cancel</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </Box>
    );
};

export default ProductCard;