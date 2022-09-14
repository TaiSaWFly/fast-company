export function parseDate(date) {
    const parseDate = new Date(parseInt(date));
    const dateNow = new Date();

    const dateDiffYeare = dateNow.getFullYear() - parseDate.getFullYear();
    if (dateDiffYeare === 0) {
        const dateDiffDay = dateNow.getDay() - parseDate.getDay();
        if (dateDiffDay === 0) {
            const dateDiffHours = dateNow.getHours() - parseDate.getHours();
            if (dateDiffHours === 0) {
                const dateDiffMinutes =
                    dateNow.getMinutes() - parseDate.getMinutes();

                if (dateDiffMinutes >= 0 && dateDiffMinutes < 5) {
                    return "1 минуту назад";
                }

                if (dateDiffMinutes >= 5 && dateDiffMinutes < 10) {
                    return "5 минут назад";
                }

                if (dateDiffMinutes >= 10 && dateDiffMinutes < 30) {
                    return "10 минут назад";
                }

                return "30 минут назад";
            }
            return `${parseDate.getHours()}:${parseDate.getMinutes()}`;
        }
        return `${parseDate.getDate()} ${parseDate.toLocaleString("default", {
            month: "short"
        })}`;
    }
    return `${parseDate.getFullYear()}.${
        parseDate.getMonth() + 1
    }.${parseDate.getDate()}`;
}
