import { useCallback, useState, useEffect } from 'react';
import NextLink from 'next/link';
import Head from 'next/head';
import {
  Avatar,
  Box,
  Button,
  Chip,
  Container,
  Divider,
  Grid,
  Link,
  Tab,
  Tabs,
  Typography,
  Card,
  Switch
} from '@mui/material';
import { infoCamereAPI } from '../../__fake-api__/infocamere-api';
import { AuthGuard } from '../../components/authentication/auth-guard';
import { DashboardLayout } from '../../components/dashboard/dashboard-layout';
import { Mission } from '../../components/dashboard/customer/mission';
import  PosizionamentoAziendale  from '../../components/dashboard/customer/posizionamento-aziendale';
import  Treeview  from '../../components/dashboard/customer/treeview';
import { PersonaleAssegnato } from '../../components/dashboard/customer/personale-assegnato';
import TreeviewComponent from '../../components/dashboard/organigramma/treeview-component';
import { useMounted } from '../../hooks/use-mounted';
import LinkIcon from '@mui/icons-material/Link'


const tabs = [
  { label: 'Mission', value: 'mission' },
  { label: 'Documenti', value: 'documenti' },
  { label: 'Gruppi di competenza', value: 'gdp' },
  { label: 'Processi', value: 'processi' }
];

const CustomerDetails = () => {
  const isMounted = useMounted();
  const [schedaDetail, setSchedaDetail] = useState(null);
  const [currentTab, setCurrentTab] = useState('mission');
  const [displayTreeview, setDisplayTreeview] = useState(false);
  const [colorByType, setColorByType] = useState(null);




  

  const getScheda = useCallback(async () => {
    try {
      const response = await infoCamereAPI.getSchedaStruttura();
      if (isMounted()) {
        setSchedaDetail(response.data);
      }
    } catch (err) {
      console.error(err);
    }
  }, [isMounted]);

  useEffect(() => {
      getScheda();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []);

    useEffect(() => {
      if(schedaDetail) {
        const type = schedaDetail.type
        let color = null 
        if(type=="direzione") color = "#84997E"
        if(type=="struttura") color = "#748BA1"
        if(type=="unita") color = "#"

        setColorByType(color)    
      }else null
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [schedaDetail]);

  const handleTabsChange = (event, value) => {
    setCurrentTab(value);
  };

  function randomIntFromInterval(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min)
  }

  // const chip = ( code, type) =>{ 
  //    return <Chip label={code} variant="outlined"  />
  // }

  const chip = (type, code) =>{ 
    const withNoCDR = code ? code.split("CDR").pop(): ""
    if(type=="direzione") return   <Chip label={withNoCDR}  variant="outlined" sx={{color: colorByType}} />

    // <FontAwesomeIcon icon={faBuilding} />
    if(type=="struttura") return  <Chip label={withNoCDR} color="struttura" sx={{color: colorByType}} />

    // <FontAwesomeIcon icon={faBriefcase} />
    if(type=="unita") return <Chip label={withNoCDR || "******"} sx={{color: colorByType}}  />
  }

  const getBgColor = type =>{
    if(type=="direzione") return '#ddffd2'
    if(type=="struttura") return  '#A7C7E7'
    if(type=="unita") return '#fff'
  }

  const getMissionColor = type =>{
    if(type=="direzione") return '#F8FFF6'
    if(type=="struttura") return  '#E4EEF7'
    if(type=="unita") return '#fff'
  }




  if (!schedaDetail) {
    return null;
  }

  return (
    <>
      <Head>
        <title>
          Dettaglio
        </title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8
        }}
      >
        <Container maxWidth="md">
          <div>
            <Grid
              container
              justifyContent="space-between"
              spacing={3}
            >
              {/* <Grid item  md={12}><Divider  orientation="horizontal" /></Grid> */}
              <Grid
                item
                  md={12}
                  sx={{
                    p:"20px 24px",
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    display: 'flex',
                    backgroundColor: getBgColor(schedaDetail.type),
                    borderRadius:"8px"
                  }}
                >
                  <Typography
                  // color="primary"
                  variant="h4"
                  sx={{color: colorByType}}
                >
                  {schedaDetail.area}
                </Typography>
                {chip(schedaDetail.type, schedaDetail.codice, )}
              </Grid>
              {/* <Grid item  md={12}><Divider  orientation="horizontal" /></Grid> */}
              <Grid
                item
                md={12}
                sx={{
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  display: 'flex',
                }}
              >
                {/* <Box
                 sx={{
                  alignItems: 'center',
                  display: 'flex',
                  overflow: 'hidden'
                 }}>
                    <Avatar
                      // src={userDetail.avatar}
                      src={"https://randomuser.me/api/portraits/women/"+3+".jpg"}
                      sx={{
                        height: 64,
                        mr: 2,
                        width: 64
                      }}
                    />
                    <div>
                      <Typography
                      color="textSecondary"
                      variant="overline"
                      >
                        {userDetail.ruolo}, {userDetail.sede}
                      </Typography>
                      <Typography variant="subtitle2" sx={{mt:"-4px"}}>
                        {userDetail.nome}
                      </Typography>
                      <Box
                        sx={{
                          display: 'flex',
                          flexDirection: 'column',
                          justifyContent: 'center',
                        }}
                      >              
                        <Typography variant="subtitle2">
                          {userDetail.email}
                        </Typography>               
                      </Box>
                    </div>
                </Box> */}
                <Box sx={{ mt: 3 }}>
                  <Box > 
                    <Typography variant="h5" sx={{color: colorByType}} >Responsabile</Typography>
                  </Box> 
                  <NextLink
                  href="/dashboard/utente"
                  passHref
                >
                 
                
                  <Box 
                    sx={{
                      flexGrow: 1, 
                      backgroundColor:"#fff", 
                      p:2, 
                      width: 950, 
                      borderRadius:"8px",
                      cursor: 'pointer',
                      '&:hover': {
                        background: "#F8F8F8",
                      },  
                    }}>
                      <Box sx={{display:"flex"}}>
                        <Avatar
                            // src={userDetail.avatar}
                            src={"https://randomuser.me/api/portraits/men/"+9+".jpg"}
                            sx={{
                              height: 64,
                              mr: 2,
                              width: 64
                            }}
                          />
                          <div>
                            <Typography
                            color="textSecondary"
                            variant="overline"
                            > 
                            {schedaDetail.nome}
                            </Typography>
                            <Typography variant="subtitle2" sx={{mt:"-4px"}}>
                            Sede: {schedaDetail.sede}
                            </Typography>
                            <Box
                              sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'center',
                              }}
                            >              
                              <Typography variant="subtitle2">
                                Email: {schedaDetail.email}
                              </Typography>               
                            </Box>
                          </div>                   
                      </Box>
                    </Box> 
                    </NextLink>
                </Box>
                
              </Grid>
         
            </Grid>
            {/* <Tabs
              indicatorColor="primary"
              onChange={handleTabsChange}
              scrollButtons="auto"
              sx={{ mt: 3 }}
              textColor="primary"
              value={currentTab}
              variant="scrollable"
            >
              {tabs.map((tab) => (
                <Tab
                  key={tab.value}
                  label={tab.label}
                  value={tab.value}
                />
              ))}
            </Tabs> */}
          </div>
          <Divider />
          <Box sx={{ mt: 3 }}>
              <Grid
                container
                spacing={3}
                >
                <Grid
                  item
                  xs={12}
                  >
                    <Box > 
                    <Typography variant="h5" sx={{color: colorByType}}  >Mission</Typography>
                  </Box> 
                  <Mission mission={schedaDetail.mission} bgColor={getMissionColor(schedaDetail.type)}/>
                  {/* {currentTab === 'mission' && <Mission mission={userDetail.mission}/>} */}
                  {/* {currentTab === 'documenti' && <Mission />}
                  {currentTab === 'gdp' && <Mission />}
                  {currentTab === 'processi' && <Mission />} */}
                  <Box sx={{display: 'flex', gap:"15px", mt:"10px"}}>
                  <Button variant="outlined" sx={{color: colorByType, borderColor: colorByType}}   endIcon={<LinkIcon />}> Documenti</Button>
                  <Button variant="outlined" sx={{color: colorByType, borderColor: colorByType}}  endIcon={<LinkIcon />}> Gruppi di appartenenza</Button>
                  <Button variant="outlined" sx={{color: colorByType, borderColor: colorByType}}  endIcon={<LinkIcon />}> Processi</Button>
                    
                    
                    
                  </Box>
                </Grid>
               
              </Grid>
      
          </Box>
          {schedaDetail.posizionamentoAziendale && (<>
          <Box sx={{ mt: 4 }}>
            <Box sx={{display: 'flex', justifyContent:"space-between"}}> 
              <Typography variant="h5" sx={{color: colorByType}}  >Posizionamento Aziendale</Typography>
              <NextLink
                href="/dashboard/organigramma"
                passHref
                
              >
                <Link
                  // color="secondary"
                  variant="subtitle2"
                  sx={{color: colorByType}}
                >
                  {"Torna all'organigramma"}
                </Link>
              </NextLink>
            </Box>
            <Card>
              <Box>
                <Box p={1} display="flex" sx={{flexDirection:"row-reverse"}}>
                  <Box style={{display: "flex", flexDirection:"column", alignItems: "center"}}>
                    <Switch 
                      checked={displayTreeview}
                      onChange={()=>setDisplayTreeview(!displayTreeview)}            
                      edge="start"
                      name="isTreeView"
                    />
                    <Typography
                      gutterBottom
                      variant="subtitle2"
                    >
                      Visualizzazione ad albero
                    </Typography>
                  </Box>  
                </Box>
                
                <Box p={3}>                
                    {!displayTreeview && <PosizionamentoAziendale organization={schedaDetail.posizionamentoAziendale}/>}
                    { displayTreeview && <TreeviewComponent org={schedaDetail.posizionamentoAziendale} h={300} dettaglio={true} />}          
                </Box>
              </Box>
            </Card>
          </Box>
          </>)}
          {schedaDetail.articolazioneOrganizzativa && (<>
          <Box sx={{ mt: 4 }}>
            <Box sx={{display: 'flex', justifyContent:"space-between"}}> 
              <Typography variant="h5" sx={{color: colorByType}}  >Articolazione organizzativa</Typography>
              {!schedaDetail.posizionamentoAziendale &&<NextLink
                href="/dashboard/organigramma"
                passHref
                
              >
                <Link
                  // color="secondary"
                  variant="subtitle2"
                  sx={{color: colorByType}}
                >
                  {"Torna all'organigramma"}
                </Link>
              </NextLink>}
            </Box>
            <Card>
              <Box>
                <Box p={1} display="flex" sx={{flexDirection:"row-reverse"}}>
                  <Box style={{display: "flex", flexDirection:"column", alignItems: "center"}}>
                    <Switch 
                      checked={displayTreeview}
                      onChange={()=>setDisplayTreeview(!displayTreeview)}            
                      edge="start"
                      name="isTreeView"
                    />
                    <Typography
                      gutterBottom
                      variant="subtitle2"
                    >
                      Visualizzazione ad albero
                    </Typography>
                  </Box>  
                </Box>
                
                <Box p={3}>                
                    {!displayTreeview && <PosizionamentoAziendale organization={schedaDetail.articolazioneOrganizzativa}/>}
                    { displayTreeview && <TreeviewComponent org={schedaDetail.articolazioneOrganizzativa} h={300} dettaglio={true} />}          
                </Box>
              </Box>
            </Card>
          </Box>
          </>)}
          <Box sx={{ mt: 3 }}>
            <Typography variant="h5"  sx={{mb : 1, color: colorByType}} >Personale Assegnato</Typography>
            <Card>
              <PersonaleAssegnato personale={schedaDetail.personaleAssegnato} headerColor={getBgColor(schedaDetail.type)} bgColor={getMissionColor(schedaDetail.type)}/>
            </Card>
          </Box>
            
        </Container>
      </Box>
    </>
  );
};

CustomerDetails.getLayout = (page) => (
  <AuthGuard>
    <DashboardLayout>
      {page}
    </DashboardLayout>
  </AuthGuard>
);

export default CustomerDetails;
