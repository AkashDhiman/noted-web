import React, { useContext } from 'react';
import { Input, FormControl, FormErrorMessage, Button } from '@chakra-ui/react';
import { Formik, Form, Field } from 'formik';
import { addMessageToDiary, addMessageToChatDump } from '../utils/firebase';
import { UserContext } from '../providers/UserProvider';

const ComposeBox = ({ currDiary, setMessages }) => {
  const [user] = useContext(UserContext);
  const uid = user.data.uid;
  return (
    <Formik
      initialValues={{ message: '' }}
      onSubmit={async (values) => {
        console.log('clicked submit');
        console.log(values.message);
        var messsages = [];
        var doc = null;
        if (currDiary != 'chatDump') {
          doc = await addMessageToDiary(uid, currDiary, values.message);
          for (var idx in doc) {
            messsages.push({
              id: doc[idx].time,
              text: doc[idx].data,
              type: 'text',
            });
          }
          setMessages(messsages);
        } else {
          doc = await addMessageToChatDump(uid, values.message);
          for (var idx2 in doc) {
            messsages.push({
              id: doc[idx2].time,
              text: doc[idx2].data,
              type: 'text',
            });
          }
          setMessages(messsages);
        }
        values.message = '';
      }}
    >
      <Form>
        <Field name="message">
          {({ field, form }) => (
            <FormControl
              position={'absolute'}
              bottom={0}
              backgroundColor="white"
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
