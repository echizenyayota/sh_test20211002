import { useState } from "react";
import { Button, Card, Heading, Page, Stack, TextField } from "@shopify/polaris";
import { ResourcePicker } from "@shopify/app-bridge-react";


const Index = () => {
  const [appendToTitle, setAppendToTitle] = useState('');
  const [appendToDescription, setAppendToDescription] = useState('');
  const [pickerOpen, setPickerOpen] = useState(false);
  const [products, setProducts] = useState([]);
  const [showToast, setshowToast] = useState(false);

  return(
    <Page>
      <Heading>Producter Updater App</Heading>
      <Card>
        <Card.Section>
          <Stack vertical>
            <TextField
              label="Apped to title"
              value={appendToTitle}
              onChange={setAppendToTitle}
            ></TextField>
            <TextField
              label="Apped to description"
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
      </Card>
    </Page>
  );

}


export default Index;
