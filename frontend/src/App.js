import './App.css';
import {useState} from "react";
import {Grid} from "semantic-ui-react";

import GridTable from "./components/GridTable";
import MenuPanel from "./components/MenuPanel";
import SubjectLink from "./components/SubjectLink";

const App = () => {
    const [subjectId, setSubjectId] = useState();

    return (
        <div>
            <Grid celled='internally'>
                <Grid.Row>
                    <Grid.Column width={3} style={{padding: 0, margin: 0, maxWidth: "300px"}}>
                        <MenuPanel/>
                    </Grid.Column>
                    <Grid.Column width={13}>
                        <Grid celled='internally'>
                            <Grid.Column width={3}>
                                <SubjectLink setSubjectId={setSubjectId}/>
                            </Grid.Column>
                            <Grid.Column width={10}>
                                <GridTable subjectId={subjectId}/>
                            </Grid.Column>
                        </Grid>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </div>
    );
}

export default App;
