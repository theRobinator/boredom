def configLocale = locale.replaceFirst(/_/, '-')

mode = 'ADVANCED'
level = 'VERBOSE'

define['goog.DEBUG'] = false
define['goog.LOCALE'] = configLocale
define['robin.Constants.API_URL'] = '/~robink/bored/api'

this['pretty-print'] = false
this['treat-warnings-as-errors'] = true
this['closure-library'] = "${projectDir}/closure/closure/goog"
this['module-output-path'] = "${buildDir}/js/${locale}/module_%s.js"
this['module-production-uri'] = "${staticUrl}/js/${locale}/module_%s.js"
this['soy-message-plugin'] = 'com.zoosk.template.soy.pomsgplugin.PoMsgPluginModule'
this['global-scope-name'] = 'zLocale'

externs = [
    "${projectDir}/externs/angular.js"
]

paths = [
	"${projectDir}/src",
    "${projectDir}/libs",
   	"${projectDir}/closure/third_party"
]

checks {
    checkRegExp = 'ERROR'
    checkTypes = 'ERROR'
    checkVars = 'ERROR'
    deprecated = 'ERROR'
    invalidCasts = 'ERROR'
    missingProperties = 'ERROR'
    nonStandardJsDocs = 'ERROR'
    undefinedVars = 'ERROR'
}



environments {

    dev {
        define['goog.DEBUG'] = true

        this['module-output-path'] = "${buildDir}/${app}/${locale}/module_%s.js"

        if (whitespace) {
            mode = 'WHITESPACE'
            this['pretty-print'] = true
        }
    }

    prod {
        this['module-production-gzip-uri'] = "${staticUrl}/js/${locale}/module_%s.gz.js"
        this['module-gzip-output-path'] = "${buildDir}/js/${locale}/module_%s.gz.js"

        this['variable-map-output-file'] = "${buildDir}/map/var_${app}_${locale}.map"
        this['property-map-output-file'] = "${buildDir}/map/prop_${app}_${locale}.map"

        this['soy-message-file-path-format'] = "${projectDir}/locale/${configLocale}/messages.po"
    }
}