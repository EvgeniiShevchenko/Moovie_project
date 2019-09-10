import React from "react";
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { FixedSizeList } from 'react-window';
import Grider from 'react-grider';
import Table from 'rc-table';
import "./filter.scss";
// import Styles from 'style-loader!css-loader?modules!../../../../node_modules/rc-table/assets/index.css';
// require('rc-table/assets/index.css');


const { ColumnGroup, Column } = Table;

const data = [
  { a: '123', key: '1' },
  { a: 'cdd', b: 'edd', key: '2' },
  { a: '1333', c: 'eee', d: 2, key: '3' },
];

const FilterPage = () => {
    const Row = (props) => {
        const { index, style } = props;
      
        return (
          <ListItem button style={style} key={index}>
            <ListItemText primary={`Item ${index + 1}`} />
          </ListItem>
        );
    };
    return (
        <>
            <Grider 
            // gap="10px"
            height="auto" 
            width="100%" 
            cols="25% 50% 25%" 
            rows="307px 307px">
            <Grider.Item 
                colStart={1}
                colEnd={1}
                rowStart={1} 
                rowEnd={4}
                wireframe>
                    <div style = {{display: "flex", justifyContent: "center", backgroundColor: "rgba(192,62,44,1)", borderRadius: "25px 0 0 0"}}>
                        <h4>Жанры</h4>
                    </div>
                    <FixedSizeList style = {{backgroundColor: "rgba(220,185,38,1)", borderRadius: "0 0 0 25px"}} height={551} width={321} itemSize={46} itemCount={200}>
                        {Row}
                    </FixedSizeList>
            </Grider.Item>
            <Grider.Item 
                colStart={2}
                colEnd={2}
                rowStart={1} 
                rowEnd={2}
                wireframe
                >
                    <div className = "backgroundColor">
                        <div className = "descriptionBlock">
                            <h4>Description</h4>
                        </div>
                        <div>
                            <p style = {{overflowY: "scroll", maxHeight: "31vh", textAlign: "center"}}>
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit minus eveniet vel provident ab beatae deleniti quas dolorum tempora, repellendus temporibus ut unde eius debitis explicabo! Necessitatibus harum voluptatum aperiam.
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit minus eveniet vel provident ab beatae deleniti quas dolorum tempora, repellendus temporibus ut unde eius debitis explicabo! Necessitatibus harum voluptatum aperiam.
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit minus eveniet vel provident ab beatae deleniti quas dolorum tempora, repellendus temporibus ut unde eius debitis explicabo! Necessitatibus harum voluptatum aperiam.
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit minus eveniet vel provident ab beatae deleniti quas dolorum tempora, repellendus temporibus ut unde eius debitis explicabo! Necessitatibus harum voluptatum aperiam.
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit minus eveniet vel provident ab beatae deleniti quas dolorum tempora, repellendus temporibus ut unde eius debitis explicabo! Necessitatibus harum voluptatum aperiam.
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit minus eveniet vel provident ab beatae deleniti quas dolorum tempora, repellendus temporibus ut unde eius debitis explicabo! Necessitatibus harum voluptatum aperiam.
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit minus eveniet vel provident ab beatae deleniti quas dolorum tempora, repellendus temporibus ut unde eius debitis explicabo! Necessitatibus harum voluptatum aperiam.
                            </p>
                        </div>
                    </div>
            </Grider.Item>
            <Grider.Item 
                colStart={2}
                colEnd={3}
                rowStart={2} 
                rowEnd={2}
                wireframe>
                    <div>
                        <h2>JSX table</h2>
                        <Table data={data}>
                            <ColumnGroup title="Bazinga">
                                <Column title="title1" dataIndex="a" key="a" width={100} />
                                <Column id="123" title="title2" dataIndex="b" key="b" width={100} />
                            </ColumnGroup>
                            <Column title="title3" dataIndex="c" key="c" width={200} />
                            <Column title="Operations" dataIndex="" key="d" render={() => <a href="#">Operations</a>} />
                        </Table>
                    </div>
            </Grider.Item>
            <Grider.Item 
                colStart={3}
                colEnd={3}
                rowStart={1} 
                rowEnd={3}
                wireframe>
                    Item 4
            </Grider.Item>
        </Grider>
        </>
    )
};

export default FilterPage;