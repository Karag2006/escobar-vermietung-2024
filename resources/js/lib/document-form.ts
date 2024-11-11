import { EquipmentItem } from "@/types/equipment";

const emptyEquipmentList: EquipmentItem[] = [];

export const blankForm = {
    customer: {
        id: 0,
        pass_number: "",
        name1: "",
        name2: "",
        birth_date: "",
        birth_city: "",
        street: "",
        plz: "",
        city: "",
        phone: "",
        email: "",
        driving_license_no: "",
        driving_license_class: "",
        car_number: "",
        comment: "",
    },
    driver: {
        id: 0,
        pass_number: "",
        name1: "",
        name2: "",
        birth_date: "",
        birth_city: "",
        street: "",
        plz: "",
        city: "",
        phone: "",
        email: "",
        driving_license_no: "",
        driving_license_class: "",
        car_number: "",
        comment: "",
    },
    trailer: {
        id: 0,
        title: "",
        plateNumber: "",
        chassisNumber: "",
        tuev: "",
        totalWeight: "",
        usableWeight: "",
        loading_size: [0],
        comment: "",
    },
    data: {
        id: 0,
        offer_number: "",
        // 04.11.2024 : Feature - Add Archive Functionality
        is_archived: false,
        reservation_number: "",
        contract_number: "",
        offer_date: "",
        reservation_date: "",
        contract_date: "",
        current_state: "",
        collect_date: "",
        return_date: "",
        collect_time: "",
        return_time: "",
        collect_at: new Date(),
        return_at: new Date(),
        total_price: 0,
        netto_price: 0,
        tax_value: 0,
        reservation_deposit_value: 0,
        reservation_deposit_date: "",
        reservation_deposit_type: "",
        reservation_deposit_recieved: false,
        final_payment_value: 0,
        final_payment_date: "",
        final_payment_type: "",
        final_payment_recieved: false,
        contract_bail: 0,
        contract_bail_date: "",
        contract_bail_type: "",
        contract_bail_return_type: "",
        contract_bail_recieved: false,
        contract_bail_returned: false,
        comment: "",
        user_id: "",
        collect_address_id: 0,
        selectedEquipmentList: emptyEquipmentList,
    },
    settings: {
        vat: 19,
        offer_note: "",
        reservation_note: "",
        contract_note: "",
        document_footer: "",
        contactdata: "",
    },
};

export type documentCustomerForm = typeof blankForm.customer;

export type documentTrailerForm = typeof blankForm.trailer;

export type documentDataForm = typeof blankForm.data & {
    selectedEquipmentList?: EquipmentItem[];
};

export type documentSettingsForm = typeof blankForm.settings;

export type documentForm = {
    customer: documentCustomerForm;
    driver: documentCustomerForm;
    trailer: documentTrailerForm;
    data: documentDataForm;
    settings: documentSettingsForm;
};
