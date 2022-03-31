import {  useState } from 'react';
import Head from 'next/head';
import {
  Box,
  Container,
  Grid,
  Typography
} from '@mui/material';
import { AuthGuard } from '../../components/authentication/auth-guard';
import { DashboardLayout } from '../../components/dashboard/dashboard-layout';
import TreeChart from '../../components/dashboard/organigramma-verticale/org-verticale-component';
import org from "./org.json"

const initialData = org



const Organigramma = () => {
  const [data] = useState(initialData);
  return (
    <>
      <Head>
        <title>
          Esempio Organigramma
        </title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8
        }}
      >
        <Container maxWidth="xl">
          <Box sx={{ mb: 4 }}>
            <Grid
              container
              justifyContent="space-between"
              spacing={3}
            >
               <Grid item md={12}>
                <Box display="flex" sx={{width:"auto", justifyContent:"space-between"}}>
                  <Typography variant="h4" >
                  Esempio Organigramma verticale
                  </Typography>              
                </Box>             
              </Grid>        
            </Grid>
          </Box>
          <Grid
            container
            spacing={4}
          >
              <Grid item md={12}>
                <div><TreeChart data={data} /> </div>
              </Grid>
              
            
          </Grid>
        </Container>
      </Box>
    </>
  );
};

Organigramma.getLayout = (page) => (
  <AuthGuard>
    <DashboardLayout>
      {page}
    </DashboardLayout>
  </AuthGuard>
);

export default Organigramma;
