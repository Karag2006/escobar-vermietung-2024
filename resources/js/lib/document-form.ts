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
        loading_size: [],
        comment: "",
    },
    data: {
        offer_number: "",
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
        total_price: "",
        netto_price: "",
        tax_value: "",
        reservation_deposit_value: "",
        reservation_deposit_date: "",
        reservation_deposit_type: "",
        reservation_deposit_recieved: "",
        final_payment_value: "",
        final_payment_date: "",
        final_payment_type: "",
        final_payment_recieved: "",
        contract_bail: "",
        contract_bail_date: "",
        contract_bail_type: "",
        contract_bail_return_type: "",
        contract_bail_recieved: "",
        contract_bail_returned: "",
        comment: "",
        user_id: "",
    },
    settings: {
        vat: "",
        offer_note: "",
        reservation_note: "",
        contract_note: "",
        document_footer: "",
        contactdata: "",
    },
};

export type documentForm = typeof blankForm;

export type documentCustomerForm = typeof blankForm.customer;

export type documentTrailerForm = typeof blankForm.trailer;
