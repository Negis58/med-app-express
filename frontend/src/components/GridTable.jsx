import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import { Button } from "semantic-ui-react";

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { addRowTable, deleteRow, fetchSupplier, updateRow } from "../api/api";


const GridTable = ({ subjectId }) => {
  const gridRef = useRef();
  const [gridApi, setGridApi] = useState();
  const [rowData, setRowData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editAddRow, setEditAddRow] = useState(false);
  const [editUpdateRow, setEditUpdateRow] = useState(false);

  const columnDefs = useMemo(() => ([{
    headerName: "Организация-исполнитель",
    children: [{ headerName: "Наименование", field: "naim_org", wrapText: true }, {
      headerName: "Местонахождение",
      field: "adr_fact",
      wrapText: true
    }, {
      headerName: "ИНН",
      field: "inn",
      wrapText: true
    }]
  }, {
    headerName: "Плазма свежозамороженная", children: [{
      headerName: "Макс. объем (тыс. литров)",
      field: "plazma_max",
      wrapText: true,
      valueParser: params => Number(params.newValue)
    }, {
      headerName: "Цена. прод. (тыс. руб за 1 тыс. литров)",
      field: "plazma_cena",
      wrapText: true,
      valueParser: params => Number(params.newValue)
    }]
  }, {
    headerName: "Эритроцитарная масса", children: [{
      headerName: "Макс. объем (тыс. литров)",
      field: "erm_max",
      wrapText: true,
      valueParser: params => Number(params.newValue)
    }, {
      headerName: "Цена. прод. (тыс. руб за 1 тыс. литров)",
      field: "erm_cena",
      wrapText: true,
      valueParser: params => Number(params.newValue)
    }]
  }, {
    headerName: "Иммуноглобулин человека", children: [{
      headerName: "Макс. объем (тыс. литров)",
      field: "immg_max",
      wrapText: true,
      valueParser: params => Number(params.newValue)
    }, {
      headerName: "Цена. прод. (тыс. руб за 1 тыс. литров)",
      field: "immg_cena",
      wrapText: true,
      valueParser: params => Number(params.newValue)
    }]
  }, {
    headerName: "Альбумин 10-процентный", wrapText: true, children: [{
      headerName: "Макс. объем (тыс. литров)",
      field: "alb_max",
      wrapText: true,
      valueParser: params => Number(params.newValue)
    }, {
      headerName: "Цена. прод. (тыс. руб за 1 тыс. литров)",
      field: "alb_cena",
      wrapText: true,
      valueParser: params => Number(params.newValue)
    }]
  }]), []);

  const defaultColDef = useMemo(() => ({
    sortable: true, resizable: true, editable: true, initialWidth: 200, maxWidth: 300, wrapHeaderText: true
  }), []);


  const getSupplier = async () => {
    const data = await fetchSupplier(subjectId);
    setRowData(data);
    setLoading(false);
  };

  useEffect(() => {
    getSupplier();
  }, [subjectId]);


  const getRowId = useMemo(() => {
    return (params) => {
      return params.data.id;
    };
  }, []);

  const addRowHandler = useCallback(() => {
    const row = gridRef.current.api.applyTransaction({ add: [{}] });
    const index = row.add[0].rowIndex;
    gridRef.current.api.startEditingCell({
      rowIndex: index, colKey: "naim_org"
    });
    gridRef.current.api.setFocusedCell(index, "naim_org");
    gridRef.current.api.ensureIndexVisible(index);

    setEditAddRow(true);
  }, []);

  const addRowHandlerSave = async (value) => {
    await addRowTable(value, subjectId);
    setEditAddRow(false);

  };

  const deleteSelectedRowHandler = () => {
    const selectedNode = getSelectedNode();
    if (selectedNode) {
      const rowId = selectedNode.id;
      const confirmDialog = window.confirm("Вы уверены, что хотите удалить строку ?", rowId);
      if (confirmDialog) {
        const result = rowData.filter(item => item.id != rowId);
        setRowData(result);
        deleteRow(rowId);
      }
    }
  };

  const onGridReady = (params) => {
    setGridApi(params.api);
  };

  const getSelectedNode = () => {
    const selectedNodes = gridApi.getSelectedNodes();
    if (selectedNodes.length === 0) {
      alert("Выберете строку");
      return null;
    }
    return gridApi.getSelectedNodes()[0];
  };

  const updateSelectedRowHandler = () => {
    const focusedCell = gridRef.current.api.getFocusedCell();
    const selectedNode = getSelectedNode();
    if (selectedNode) {
      gridRef.current.api.startEditingCell({
        rowIndex: focusedCell.rowIndex, colKey: "naim_org"
      });
      setEditUpdateRow(true);
    }
  };

  const updateSelectedRowHandlerSave = async (value) => {
    const selectedNode = getSelectedNode();
    if (selectedNode) {
      const id = selectedNode.id;
      await updateRow(id, value);
      setEditUpdateRow(false);
    }
  };
  const [typeData, setTypeData] = useState("");

  const onRowValueChanged = (event) => {
    const value = event.data;
    if (typeData === "add") {
      addRowHandlerSave(value);
    }
    if (typeData === "update") {
      updateSelectedRowHandlerSave(value);
    }

  };
  const onBtStopEditing = (type) => {
    gridRef.current.api.stopEditing();
    setTypeData(type);
  };


  return (<>
    <div className="button-block">
      {!editAddRow ? (<Button onClick={addRowHandler} type="button" primary>Создать запись</Button>) :
        <Button onClick={() => onBtStopEditing("add")} type="button" primary
                className="btn btn-secondary mx-2">Сохранить</Button>}
      {!editUpdateRow ? (
        <Button onClick={updateSelectedRowHandler} primary type="button">Обновить</Button>) : (
        <Button onClick={() => onBtStopEditing("update")} primary type="button"
        >Сохранить</Button>)}

      <Button onClick={deleteSelectedRowHandler} primary type="button">Удалить</Button>
    </div>
    <>
      {!loading && (<div id="myGrid" className="ag-theme-alpine" style={{ width: "1250px", height: "800px" }}>
        <AgGridReact
          ref={gridRef}
          rowData={rowData}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          rowSelection={"multiple"}
          editType={"fullRow"}
          pagination={true}
          onGridReady={onGridReady}
          getRowId={getRowId}
          suppressClickEdit={true}
          onRowValueChanged={onRowValueChanged}
        />
      </div>)}
    </>
  </>);
};
export default GridTable;