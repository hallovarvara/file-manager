export const sortRecordsAlphabetically = (records, property) =>
    [...records].sort((a, b) =>
        a?.[property]?.toLowerCase() > b?.[property]?.toLowerCase() ? 1 : -1,
    );
