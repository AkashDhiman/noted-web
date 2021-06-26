import React from 'react';
import { Input, FormControl, FormErrorMessage, Button } from '@chakra-ui/react';
import { Formik, Form, Field } from 'formik';

const ComposeBox = ({ setMessages }) => {
  return (
    <Formik
      initialValues={{ message: '' }}
      onSubmit={async (values) => {
        setMessages((prevState) => [...prevState, values.message]);
      }}
    >
      <Form>
        <Field name="message">
          {({ field, form }) => (
            <FormControl
              position={'absolute'}
              bottom={0}
              width={'800px'}
              display={'flex'}
              isInvalid={form.errors.message && form.touched.message}
            >
              <Input {...field} id="message" placeholder="message" />
              <FormErrorMessage>{form.errors.message}</FormErrorMessage>
              <Button
                variant={'solid'}
                bg={'green.400'}
                color={'white'}
                type="submit"
              >
                Save
              </Button>
            </FormControl>
          )}
        </Field>
      </Form>
    </Formik>
  );
};

export default ComposeBox;
