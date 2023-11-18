
export default {
    locales: ['en', 'de'],
    // An array of the locales in your applications
  
    defaultNamespace: 'common',

    output: 'src/locales/$LOCALE/$NAMESPACE.json',
    input: [ 'src/**/*.jsx', 'src/**/*.js'],

    failOnWarnings: false
}