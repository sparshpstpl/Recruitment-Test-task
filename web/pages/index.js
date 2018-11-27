/* @flow */

import * as React from 'react';
import { Flex } from '@rebass/grid/emotion';
import Head from 'next/head';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import AddIcon from '@material-ui/icons/Add';
import TextField from '@material-ui/core/TextField';
import FormHelperText from '@material-ui/core/FormHelperText';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Link } from '../controls/link';
import { createMutation } from '../controls/relay';
import type { PropertyUpsertMutation } from './__generated__/PropertyUpsertMutation.graphql';

const PropertyUpsertLead = createMutation<PropertyUpsertMutation, {}>(graphql`
  mutation pagesUpsertMutation($input: UpsertPropertyInput!) {
    upsertProperty(input: $input) {
      property {
        id
        landSurface
        livingSurface
      }
    }
  }
`);

export default () => (
  <>
    <Head>
      <title>{'Home'}</title>
    </Head>
    <Flex justifyContent="center">
      <Paper
        css={{
          maxWidth: 960,
          marginTop: 16,
          marginBottom: 16,
          width: '100%',
          padding: 16,
        }}
      >
      <Link href={{ pathname: '/property' }}>
                <Button
                  to="/property"
                  color="primary"
                  variant="extendedFab"
                  css={{ marginTop: 10, marginBottom: 10 }}
                >
                  Back To List
                </Button>
              </Link>
        <Typography variant="h6" css={{ marginBottom: 24 }}>
          Add Property
        </Typography>
        <PropertyUpsertLead>
          {({ mutate }) => (
            <Formik
              initialValues={{
                livingSurface: '',
                landSurface: '',
                numberOfRooms: '',
                numberOfParkings: '',
              }}
              onSubmit={(values, { setSubmitting }) => {
                const formData = { "property": values };
                mutate(formData)
                setTimeout(() => {
                  setSubmitting(false);
                  window.location='/property';
                }, 500);
              }}
              validationSchema={Yup.object().shape({
                livingSurface: Yup.number().min(20).max(5000).required('Required'),
                landSurface: Yup.number().min(20).max(5000).required('Required'),
                numberOfRooms: Yup.number().min(20).max(5000).required('Required'),
                numberOfParkings: Yup.number().integer().min(20).max(5000).required('Required'),
              })}
            >
              {props => {
                const {
                  values,
                  touched,
                  errors,
                  isSubmitting,
                  handleChange,
                  handleBlur,
                  handleSubmit,
                } = props;
                return (
                <form onSubmit={handleSubmit}>
                  <FormControl
                    error={errors.livingSurface && touched.livingSurface}
                  >
                    <TextField
                      id="livingSurface"
                      label="Living Surface"
                      margin="normal"
                      variant="outlined"
                      value={values.livingSurface}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {errors.livingSurface && touched.livingSurface &&
                      <FormHelperText id="livingSurface-text">
                        {errors.livingSurface}
                      </FormHelperText>
                    }
                  </FormControl>
                  <FormControl
                    error={errors.landSurface && touched.landSurface}
                  >
                    <TextField
                      id="landSurface"
                      label="Land Surface"
                      variant="outlined"
                      margin="normal"
                      value={values.landSurface}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {errors.landSurface && touched.landSurface &&
                      <FormHelperText id="landSurface-text">
                        {errors.landSurface}
                      </FormHelperText>
                    }
                  </FormControl>
                  <FormControl
                    error={errors.numberOfRooms && touched.numberOfRooms}
                  >
                    <TextField
                      id="numberOfRooms"
                      label="Number of Rooms"
                      margin="normal"
                      variant="outlined"
                      value={values.numberOfRooms}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {errors.numberOfRooms && touched.numberOfRooms &&
                      <FormHelperText id="numberOfRooms-text">
                        {errors.numberOfRooms}
                      </FormHelperText>
                    }
                  </FormControl>
                  <FormControl
                    error={errors.numberOfParkings && touched.numberOfParkings}
                  >
                    <TextField
                      id="numberOfParkings"
                      margin="normal"
                      label="Number of Parkings"
                      variant="outlined"
                      value={values.numberOfParkings}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {errors.numberOfParkings && touched.numberOfParkings &&
                      <FormHelperText id="numberOfParkings-text">
                        {errors.numberOfParkings}
                      </FormHelperText>
                    }
                  </FormControl>
                  <FormControl>
                    <Button
                      onClick={handleSubmit}
                      variant="contained"
                      color="primary"
                      css={{ marginTop: 18, height: 50 }}
                      type="submit"
                      style={{justifyContent: 'center'}}
                      disabled={isSubmitting}
                    > 
                      Save
                    </Button>
                  </FormControl>
              </form>
            );
          }}
        </Formik>
      )}
    </PropertyUpsertLead>
  </Paper>
</Flex>
</>
);
