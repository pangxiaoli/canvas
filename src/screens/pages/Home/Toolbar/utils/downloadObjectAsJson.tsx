import { stringify } from 'yaml';

export const downloadObjectAsToml = (objectData: object, fileName: string) => {
    const toml = stringify(objectData);
    const blob = new Blob([toml], { type: 'application/yaml' });
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.download = fileName + '.yaml';
    link.href = url;
    link.click();

    URL.revokeObjectURL(url);
};
