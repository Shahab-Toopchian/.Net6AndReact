import { observer } from 'mobx-react-lite';
import React from 'react';
import { Grid } from 'semantic-ui-react';
import { useStore } from '../../../app/stores/store';
import ActivityDetails from '../Details/ActivityDetails';
import ActivityForm from '../Form/ActivityForm';
import ActivityList from './ActivityList';

// interface  Props{
//  activities : Activity[];
//   selectedActivity : Activity | undefined;
//   selectActivity : (id : String) => void;
//   cancelSelectedActivity : () => void;
//   openForm : (id : String) => void;
//   closeForm : () => void;
//  editMode : boolean; 
//  submitting : boolean; 
//  deleteActivity : (id : String) => void;
// } 

export default observer(function ActivityDashboard() {
    const {activityStore} =useStore();
    const {selectedActivity,editMode} =activityStore;
    return (
        <Grid>
            <Grid.Column width='10'>
                <ActivityList/>
            </Grid.Column>
            <Grid.Column width='6'>
                {selectedActivity && !editMode &&
                <ActivityDetails/>} 
                {editMode &&
                <ActivityForm />}
            </Grid.Column>
        </Grid>

    );
})