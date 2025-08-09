export const isRelativePathRegex = 
  /^\/(?:[A-Za-z0-9-._~!$&'()*+,;=:@]|%[0-9a-fA-F]{2})*(?:\/(?:[A-Za-z0-9-._~!$&'()*+,;=:@]|%[0-9a-fA-F]{2})*)*$/;

export const isUrlOrRelativePath = (url: string): boolean => {
    try {
        new URL(url);
        return true;
    } catch {
        return isRelativePathRegex.test(url)
    }
}