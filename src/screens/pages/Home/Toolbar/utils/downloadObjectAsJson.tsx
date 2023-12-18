export const downloadObjectAsJson = (objectData: object, fileName: string) => {
    const json = JSON.stringify(objectData);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.download = fileName;
    link.href = url;
    link.click();

    URL.revokeObjectURL(url);
};
