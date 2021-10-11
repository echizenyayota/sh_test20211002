import { useState, useMemo, useCallback } from "react";
import { Button, Card, DataTable, EmptyState, Heading, Page, Stack, TextField } from "@shopify/polaris";
import { ResourcePicker } from "@shopify/app-bridge-react";
import {useMutaion} from 'react-apollo';
import { ProductUpdateMutation } from "../graphql/ProductUpdate";


const Index = () => {
  const [appendToTitle, setAppendToTitle] = useState('');
  const [appendToDescription, setAppendToDescription] = useState('');
  const [pickerOpen, setPickerOpen] = useState(false);
  const [products, setProducts] = useState([]);
  const [showToast, setshowToast] = useState(false);

  const [updateProduct] = useMutation(ProductUpdateMutation)

  const productPikerHandler = useCallback(() => setPickerOpen(true))

  const productTableDisplayData = useMemo(() => products.map((product) => [
      product.id,
      product.title,
      `${product.title}${appendToTitle}`,
      product.descriptionHtml,
      `${product.descriptionHtml}${appendToDescription}`
  ]), [products, appendToTitle, appendToDescription]);

  const submitHandler = useCallback(() => {
    let count = 0;
    const runMutation = (product) => {
      updateProduct({
        variables: {
          input: {
            descriptionHtml: `${product.descriptionHtml}${appendToDescription}`,
            title:`${product.title}${appendToTitle}`,
            id: product.id
          }
        }
      }), then((data) => {
        console.log('Update Product', count, data);
        count++;
        if (products[count]) {
          runMutation(product[count])
        } else {
          console.log('Update Compete');
          setshowToast(true);
        }
      })
    }
    runMutation(products[count]);
  }, [products, appendToTitle, appendToDescription]);

  const toastMarkup = showToast ? 
    <Toast
      content="Update Successful"
      onDismiss={() => SetShowToast(false)}
      duration={4000}
    /> : null

  return(
    <Page>
      <Heading>Producter Updater App</Heading>
      <Card>
        <Card.Section>
          <Stack vertical>
            <TextField
              label="Append to title"
              value={appendToTitle}
              onChange={setAppendToTitle}
            ></TextField>
            <TextField
              label="Append to description"
              value={appendToDescription}
              onChange={setAppendToDescription}
              multiline={3}
            ></TextField>
            <ResourcePicker
              resourceType="Product"
              showVariants={false}
              open={pickerOpen}
              onSelection={(resources) => {
                console.log(resources);
                setProducts(resources);
              }}
            />
            <Button primary onClick={() => console.log('Clicked')}>Select Products</Button>
          </Stack>
        </Card.Section>
        <Card.Section>
          {productTableDisplayData.legth ? <DataTable
            columnContentTypes={['text','text','text','text','text' ]}
            headings={['ID', 'Old Title', 'New Title', 'Old Description', 'New Description']}
            rows={[productTableDisplayData]}
          /> : <EmptyState heading="No Product Selected"/>} 
        </Card.Section>
        <Card.Section>
          <Button primary onClick={submitHandler} disabled={!products.length}>Submmit</Button>
        </Card.Section>
      </Card>
    </Page>
  );

}

export default Index;
