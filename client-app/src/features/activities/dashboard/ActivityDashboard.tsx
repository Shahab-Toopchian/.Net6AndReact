import React from 'react';
import { Grid } from 'semantic-ui-react';
import { Activity } from '../../../app/models/activity';
import ActivityDetails from '../Details/ActivityDetails';
import ActivityForm from '../Form/ActivityForm';
import ActivityList from './ActivityList';

interface  Props{
 activities : Activity[];
 selectedActivity : Activity | undefined;
 selectActivity : (id : String) => void;
 cancelSelectedActivity : () => void;
 openForm : (id : String) => void;
 closeForm : () => void;
 editMode : boolean; 
 createOrEdit : (activity : Activity) => void;
 deleteActivity : (id : String) => void;
} 

export default function ActivityDashboard( {activities,selectedActivity,deleteActivity,
    selectActivity,cancelSelectedActivity,openForm,closeForm,editMode,createOrEdit} : Props) {
    return (
        <Grid>
            <Grid.Column width='10'>
                <ActivityList activities={activities} 
                selectActivity={selectActivity}
                deleteActivity={deleteActivity} />
            </Grid.Column>
            <Grid.Column width='6'>
                {selectedActivity && !editMode &&
                <ActivityDetails activity={selectedActivity} cancelSelectedActivity={cancelSelectedActivity}
                openForm ={openForm}/>} 
                {editMode &&
                <ActivityForm closeForm ={closeForm} activity={selectedActivity} createOrEdit={createOrEdit}/>}
            </Grid.Column>
        </Grid>

    );
}