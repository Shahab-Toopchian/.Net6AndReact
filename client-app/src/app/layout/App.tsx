import React, { Fragment, useEffect } from 'react';
import { Container } from 'semantic-ui-react';
import NavBar from './NavBar';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';
import LoadingComponent from './LoadingComponent';
import { observer } from 'mobx-react-lite';
import { useStore } from '../stores/store';

function App() {
//const [loading,setLoading] = useState(true);
//const [activities,setActivities] = useState<Activity[]>([]);
// const [selectedActivity,setSelectedActivity] = useState<Activity | undefined>(undefined);
// const [editMode,setEditMode] = useState(false);
//const [submitting,setsubmitting] = useState(false);

  const {activityStore} =useStore();
  useEffect(() => {
      //after MobX
      activityStore.loadActivities();
    }, [activityStore])
    //before MobX
    // agent.Activities.list().then(response => {
    //   let activities : Activity[] = [];
    //   response.forEach(activity =>{
    //     activity.date = activity.date.split('T')[0];
    //     activities.push(activity);
    //   })
    //   setActivities(response);
    //   setLoading(false);
    // })

  

  // function handleSelectedActivity(id : String){
  //   setSelectedActivity(activities.find(x => x.id === id));
  // }

  // function handleCancelActivity() {
  //   setSelectedActivity(undefined);
  // }

  // function handleFormOpen(id?: String) {
  //   id ? handleSelectedActivity(id) : handleCancelActivity();
  //   setEditMode(true);
  // }

  // function handleFormClose() {
  //   setEditMode(false);
  // }

  // function handleCreateOrEditActivity(activity: Activity) {
  //   setsubmitting(true);
  //   if (activity.id) {
  //     agent.Activities.update(activity).then(() => {
  //       setActivities([...activities.filter(x => x.id !== activity.id), activity])
  //       setSelectedActivity(activity);
  //       setEditMode(false);
  //       setsubmitting(false);
  //     })
  //   } else {
  //     activity.id = uuid();
  //     agent.Activities.create(activity).then(() => {
  //       setActivities([...activities, activity]);
  //       setSelectedActivity(activity);
  //       setEditMode(false);
  //       setsubmitting(false);
  //     })
  //   }
  // }

  // function handleDeleteActivity(id : String){
  //   setsubmitting(true);
  //   agent.Activities.delete(id).then(()=>{
  //     setActivities([...activities.filter(x=>x.id !== id )])
  //     setsubmitting(false);
  //   })
    
  // }

  //before MobX
  //if(loading) return <LoadingComponent content='Loading app'/>
  //after MobX
  if(activityStore.loadingInitial) return <LoadingComponent content='Loading app'/>

  return (
    <Fragment>
        <NavBar/>
        <Container style={{marginTop: '7em'}}>
          <ActivityDashboard 
          //before MobX
          //activities={activities}
          // selectActivity={handleSelectedActivity}
          // cancelSelectedActivity={handleCancelActivity}
          // openForm={handleFormOpen}
          // closeForm={handleFormClose}
          // activities={activityStore.activities}
          // deleteActivity={handleDeleteActivity}
          // submitting={submitting}
          />
        </Container>

  
    </Fragment>
  );
}

export default observer(App);
