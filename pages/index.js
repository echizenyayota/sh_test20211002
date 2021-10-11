import { useState, useMemo, useCallback } from "react";
import { Button, Card, DataTable, EmptyState, Heading, Page, Stack, TextField } from "@shopify/polaris";
import { ResourcePicker } from "@shopify/app-bridge-react";


const Index = () => {
  const [appendToTitle, setAppendToTitle] = useState('');
  const [appendToDescription, setAppendToDescription] = useState('');
  const [pickerOpen, setPickerOpen] = useState(false);
  const [products, setProducts] = useState([]);
  const [showToast, setshowToast] = useState(false);

  // console.log(products);

  const productTableDisplayData = useMemo(() => products.map((product) => [
      product.id,
      product.title,
      `${product.title}${appendToTitle}`,
      product.descriptionHtml,
      `${product.descriptionHtml}${appendToDescription}`
  ]), [products, appendToTitle, appendToDescription]);

  const submitHandler = useCallback(() => {
    console.log('submitting');
  }, []);


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
              open
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
