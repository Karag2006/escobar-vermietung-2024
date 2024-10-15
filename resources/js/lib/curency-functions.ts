export const floatToString = (floatValue: number) => {
    if (floatValue) return floatValue.toFixed(2).replace(".", ",");
    return "";
};

export const stringToFloat = (stringValue: string) => {
    if (stringValue) return parseFloat(stringValue.replace(",", "."));
    return 0.0;
};

export const calculateVatValues = (totalValue: number, vat: number) => {
    if (totalValue > 0) {
        const netValue = Math.round((totalValue / (1 + vat / 100)) * 1e2) / 1e2;
        const vatValue = Math.round((totalValue - netValue) * 1e2) / 1e2;
        return { netValue, vatValue };
    }
    return null;
};

export const calculateDeposit = (
    totalValue: number,
    currentDeposit: number
): number | null => {
    let deposit = currentDeposit;
    if (deposit <= 0) {
        if (totalValue > 0) {
            const depositValue = Math.round(totalValue * (1 / 3) * 1e2) / 1e2;
            return depositValue;
        }
        return null;
    }
    return deposit;
};

export const calculateFinalPayment = (
    totalValue: number,
    currentDeposit: number | null
) => {
    let deposit = currentDeposit;
    let finalPayment = 0.0;

    if (totalValue > 0) {
        if (!deposit || deposit <= 0) {
            finalPayment = Math.round(totalValue * 1e2) / 1e2;
            deposit = Math.round(0.0 * 1e2) / 1e2;
        } else {
            finalPayment = Math.round((totalValue - deposit) * 1e2) / 1e2;
        }
        return { finalPayment, deposit };
    }
    return null;
};

export const calculateValues = (
    totalValue: number,
    depositValue: number,
    vat: number,
    doCalculateDeposit: boolean
) => {
    const vatValues = calculateVatValues(totalValue, vat);
    let deposit: number | null = 0.0;
    if (doCalculateDeposit) {
        deposit = calculateDeposit(totalValue, depositValue);
    }
    const finalValues = calculateFinalPayment(totalValue, deposit);
    return {
        totalValue,
        depositValue: deposit,
        netValue: vatValues?.netValue,
        vatValue: vatValues?.vatValue,
        finalPayment: finalValues?.finalPayment,
    };
};
