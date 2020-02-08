// import { FormProps } from 'antd/lib/form';

/**
 * Svc types
 */
export interface ReducerState {
    appKeys: any[];
    tableSource: any[];
    record: object;
    info: string;
    visible: boolean;
    editVisible: boolean;
    total: number;
    isLoading: boolean;
}

export interface StateProps extends ReducerState {
    isMobile: boolean;
}

export interface DispatchProps {
    fetchAppKeys: any;
    fetchTableSource: any;
    showModal: any;
    showEditModal: (param: any) => void;
    closeModal: any;
}

export type SvcProps = StateProps & DispatchProps;

export type SvcState = {};

// sub component

export type SearchProps = {
    appKeys: any,
    submit: (params: any) => void
};

export type TableProps = {
    tableSource: any[];
    isLoading: boolean;
    isMobile: boolean;
    total: number;
    showInfoModal: (param: any) => void;
    showEditModal: (param: any) => void;
}

export interface TableState {
    total: number;
}

export type ModalProps = {
    info: string;
    visible: boolean;
    closeModal: () => void;
};

export type EditModalProps = {
    record: any,
    editVisible: boolean,
    closeModal: () => void;
};
