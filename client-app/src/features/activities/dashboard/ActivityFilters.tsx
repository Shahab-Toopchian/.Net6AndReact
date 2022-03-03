import React, { Fragment } from "react";
import Calendar from "react-calendar";
import { Header, Menu } from "semantic-ui-react";


export default function ActivityFilters (){

    return(
        <Fragment>
            <Menu vertical size="large" style={{width : '100%' , marginTop:50}}>
                <Header icon='filter' attached color='teal' content='Filters'/>
                <Menu.Item content='All Activities'/>
                <Menu.Item content='I am going '/>
                <Menu.Item content='I am hosting '/>
            </Menu>
            <Header />
            <Calendar/>
        </Fragment>

    )
}
