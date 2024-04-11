import * as React from 'react';
import {
    GridColumnMenuSort,
    GridColumnMenuFilter, GridColumnMenuItemGroup, GridColumnMenuItem, GridColumnMenuItemContent,
    GridColumnMenuProps
} from '@progress/kendo-react-grid';

import { columnInterface } from './interfaces';

interface CustomColumnMenuProps extends GridColumnMenuProps {
  columns: Array<columnInterface>,
  onColumnsSubmit: (event: any) => void;
}

export const CustomColumnMenu = (props: CustomColumnMenuProps) => {

    const [columns, setColumns] = React.useState<Array<columnInterface>>(props.columns);
    const [columnsExpanded, setColumnsExpanded] = React.useState<boolean>(false);
    const [filterExpanded, setFilterExpanded] = React.useState<boolean>(false);

    const onToggleColumn = (id: number) => {
        const newColumns = columns.map((column, idx) => {
            return idx === id ? { ...column, show: !column.show } : column;
        });
        setColumns(newColumns);
    }

    const onReset = (event) => {
        event.preventDefault();
        const newColumns: Array<columnInterface> = props.columns.map(col => {
            return {
                ...col,
                show: true
            };
        });
        setColumns(newColumns);
        props.onColumnsSubmit(newColumns);
        if (props.onCloseMenu) {
            props.onCloseMenu();
        }
    }

    const onSubmit = (event) => {
        if (event) {
            event.preventDefault();
        }
        props.onColumnsSubmit(columns);
        if (props.onCloseMenu) {
            props.onCloseMenu();
        }
    }

    const onMenuItemClick = () => {
        const value = !columnsExpanded;
        setColumnsExpanded(value);
        setFilterExpanded(value ? false : filterExpanded);
    }

    const onFilterExpandChange = (value: boolean) => {
        setFilterExpanded(value);
        setColumnsExpanded(value ? false : columnsExpanded);
    }

    const oneVisibleColumn = columns.filter(c => c.show).length === 1;

    return (
      <div>
        <GridColumnMenuSort {...props} />
        <GridColumnMenuFilter
          {...props}
          onExpandChange={onFilterExpandChange}
          expanded={filterExpanded}
            />
        <GridColumnMenuItemGroup>
          <GridColumnMenuItem
            title={'Columns'}
            iconClass={'k-i-columns'}
            onClick={onMenuItemClick}
                />
          <GridColumnMenuItemContent show={columnsExpanded}>
            <div className={'k-column-list-wrapper'}>
              <form onSubmit={onSubmit} onReset={onReset}>
                <div className={'k-column-list'}>
                  {columns.map((column, idx) =>
                                (
                                  <div key={idx} className={'k-column-list-item'}>
                                    <span>
                                      <input
                                        id={`column-visiblity-show-${idx}`}
                                        className="k-checkbox k-checkbox-md k-rounded-md"
                                        type="checkbox"
                                        readOnly={true}
                                        disabled={column.show && oneVisibleColumn}
                                        checked={column.show}
                                        onClick={() => { onToggleColumn(idx); }}
                                            />
                                      <label
                                        htmlFor={`column-visiblity-show-${idx}`}
                                        className="k-checkbox-label"
                                        style={{ userSelect: 'none' }}
                                            >
                                        {column.title}
                                      </label>
                                    </span>
                                  </div>
                                )
                                )}
                </div>
                <div className={'k-actions k-hstack k-justify-content-stretch'}>
                  <button type={'reset'} className={'k-button k-button-md k-rounded-md k-button-solid k-button-solid-base'}>Reset</button>
                  <button className={'k-button k-button-md k-rounded-md k-button-solid k-button-solid-primary'}>Save</button>
                </div>
              </form>
            </div>
          </GridColumnMenuItemContent>
        </GridColumnMenuItemGroup>
      </div>
    );
}
