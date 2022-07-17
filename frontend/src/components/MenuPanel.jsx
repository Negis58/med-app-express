import data from "../data";
import {useState} from "react";
import ExtPanel from "@sencha/ext-react-modern/dist/ExtPanel";
import ExtTreelist from "@sencha/ext-react-modern/dist/ExtTreelist";



const MenuPanel = () => {

    const store = Ext.create('Ext.data.TreeStore', {
        rootVisible: true,
        root: data
    });

    const [item, setItem] = useState({
        nav: true,
        micro: false,
        width: undefined
    });

    return (
        <>
            <ExtPanel
                shadow={!Ext.os.is.Phone}
                scrollable
                width="100%"
                height="100%"
                platformConfig={{"!phone": {
                    width: "300px",
                    height: "500px",
                  }
                }}
            >
                <ExtTreelist
                    expanderOnly={false}
                    store={store}
                    expanderFirst={!item.nav}
                    ui={item.nav ? 'nav' : null}
                />
            </ExtPanel>
        </>
    )
}
export default MenuPanel;