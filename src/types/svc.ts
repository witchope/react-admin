import { FormProps } from 'antd/lib/form';

/**
 * Svc types
 */
export interface SvcState {
    appKeys: any[];
    tableSource: any[];
    info: string;
    visible: boolean;
    isLoading: boolean;
}

export interface StateProps extends SvcState {
    // responsive: any;
    isMobile: false;
}

export interface DispatchProps {
    fetchAppKeys: any;
    fetchTableSource: any;
    showModal: any;
    closeModal: any;
}

export type SvcProps = StateProps & DispatchProps & FormProps;

// sub component

export type SearchProps = {
    appKeys: any,
    submit: (params: any) => void
} & FormProps;

export type TableProps = {
    tableSource: any[];
    isLoading: boolean;
    isMobile: boolean;
    showInfoModal: (param: any) => void;
}

export interface TableState {
    total: number;
}

export type ModalProps = {
    info: string;
    visible: boolean;
    closeInfoModal: (param: any) => void;
} & FormProps;
