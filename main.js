function handler(event) {
    //Obteniendo el dominio del ambiente
    var request = event.request;
    var cabeceras = request.headers
    var requestUrl = request.uri.split("?")[0];
    var redirectUrl = '';
    var response = {};
    
    //Quitamos la diagonal del final (en caso de existir)
    if (requestUrl.slice(-1) == "/"){
        requestUrl = requestUrl.slice(0, -1);
    }
    
    //Mapeo de urls de afiliado
    // Objetos de mapeo de URL de origen a URL de destino
    //Mapeo de afiliados con webhook
    var redirectionMapConWebhook = {
        '/doaffiliate': 'codRef=884',
        '/toro': 'codRef=10953',
        '/ojo7': 'codRef=10967',
        '/rocket': 'codRef=2518',
        '/yoteprestoeem': 'codRef=26114',
        '/yoteprestoblog': 'codRef=26090',
        '/zenfieem': 'codRef=26091',
        '/zenfiblog': 'codRef=26092',
        '/zenfiapp': 'codRef=37567',
        '/destacame': 'codRef=153',
        '/coru': 'codRef=473',
        '/salesdoubler': 'codRef=2766&ck=true',
        '/crezu': 'codRef=120381',
        '/finansi': 'codRef=120364',
        '/fiizy': 'codRef=268053',
        '/qiip': 'codRef=76618',
        '/Loandogroup': 'codRef=269895',
        '/LeadGid': 'codRef=277236' ,
        '/gurudetarjetas': 'codRef=990',
        '/rankia': 'codRef=889',
        '/destacamepru': 'codRef=220506',
        '/destacamemail': 'codRef=10960',
        '/destacameig': 'codRef=43469',
        '/instagram': 'codRef=849',
        '/ikiwi': 'codRef=189',
        '/ikiwirs': 'codRef=11013',
        '/ikiwibs': 'codRef=267051',
        '/kardmatchcompara': 'codRef=154',
        '/kardmatchblog': 'codRef=10915',
        '/kardmatchpi': 'codRef=10916',
        '/kardmatchpop': 'codRef=10917',
        '/kardmatchem': 'codRef=10918',
        '/kardmatchytb': 'codRef=10956',
        '/kardmatchamex': 'codRef=43642',
        '/kardmatchcarnetprim': 'codRef=116635',
        '/kardmatchamexprim': 'codRef=116636',
        '/facebook': 'codRef=204',
        '/facebook2': 'codRef=26116',
        '/twitter': 'codRef=834',
        '/kardmatchcamp': 'codRef=10959',
        '/benshorts': 'codRef=26107',
        '/wikichava': 'codRef=26108',
        '/coolturafinanciera': 'codRef=26109',
        '/soy_sofia_mata': 'codRef=26111',
        '/rosyrosy.salinass': 'codRef=26112',
        '/juliolopezjl': 'codRef=26113',
        '/saidochoa': 'codRef=30078',
        '/alexiagarcia': 'codRef=30079',
        '/promeritumcupon': 'codRef=159903',
        '/promeritum': 'codRef=159904',
        '/vexiapp': 'codRef=164003',
        '/inversionistas50': 'codRef=178592',
        '/diri': 'codRef=205105',
        '/pillofon': 'codRef=214280',
        '/distritopyme': 'codRef=224289',
        '/ikiwint': 'codRef=237730',
        '/basebancaria': 'codRef=237734',
        '/bb': 'codRef=244624',
        '/bbw': 'codRef=244625',
        '/kardmatchcamppaga': 'codRef=247575',
        '/hellosafe01': 'codRef=247578',
        '/kardmatchsca': 'codRef=250657',
        '/kardmatchnwswb': 'codRef=258756',
        '/fidea': 'codRef=261240',
        '/fideaeml': 'codRef=261241',
        '/rmkt': 'codRef=262873',
        '/doaffiliatepubp': 'codRef=268054',
        '/kardmatchscl': 'codRef=268992',
        '/adqmkt': 'codRef=269459',
        '/C2M': 'codRef=272500',
        '/Corderhouse': 'codRef=273458',
        '/GoodAff': 'codRef=277233',
        '/CancunVIP': 'codRef=277232',
        '/AhauTulum': 'codRef=277241',
        '/bankos/dsply': 'codRef=279190',
        '/bankos': 'codRef=106760',
        '/tktads': 'codRef=278205',
        '/digitalhub': 'codRef=279988',
        '/cemype': 'codRef=279991',
        '/admitad': 'codRef=283404',
        '': ''
    };
    //Mapeo de afiliados a orgánico
    var redirectionMapOrganico = [
          '/comparaya',
          '/credilikeme',
          '/solcredito',
          '/finder',
          '/finder2',
          '/gurudetarjetas',
          '/keobra',
          '/leadgenios',
          '/leadgenios1',
          '/leadgenios2',
          '/leadgenios3',
          '/leadgenios4',
          '/leadgenios5',
          '/leadgenios6',
          '/leadgenios7',
          '/leadgenios8',
          '/leadgenios9',
          '/leadgenios10',
          '/mexco',
          '/rastreator',
          '/transidm',
          '/tudecide',
          '/askrobin',
          '/making',
          '/gts',
          '/p',
          '/eshkol',
          '/promeritumpi',
          '/promeritumcupon',
          '/promeritum',
          '/keo100',
          '/keo50',
          '/keo0',
          '/bonnusA',
          '/bonnusB',
          '/bonnusC',
          '/bonnusD',
          '/bonnusE',
          '/bonnusF',
          '/bonnusG',
          '/bonnusH',
          '/bonnusI',
          '/bonnusJ',
          '/bonnusK',
          '/bonnusL',
          '/bonnusM',
          '/bonnusN',
          '/shuttle99'
    ];
    var mapeoOrganicoCodRef = [
          '291329',
          '277236',
          '283404',
          '247578',];


    if (redirectionMapConWebhook.hasOwnProperty(requestUrl)) {
        
        //Obtenemos el query string de la petición original
        
        var queryString = request.querystring;
        var cantidad = Object.keys(queryString).length;
        if (queryString.hasOwnProperty("email") && queryString.hasOwnProperty("codigo") && cantidad == 2) {
            return request;
        } else if (queryString.hasOwnProperty("email") && queryString.hasOwnProperty("codigo") && queryString.hasOwnProperty("utm_medium") && queryString.hasOwnProperty("utm_source") && cantidad == 4) {
            return request;
        } else if (queryString.hasOwnProperty("tkn") && cantidad == 1) {
            return request;
        } else if (queryString.hasOwnProperty("email") && cantidad == 1) {
            return request;
        } else if (queryString.hasOwnProperty('codRef') && mapeoOrganicoCodRef.includes(queryString['codRef']['value']) ){
            redirectUrl = `https://vexi.mx/?codRef=442`;
            // Redirige a la URL de destino
            response = {
              statusCode: 301,
              statusDescription: 'Found',
              headers: {
                location: {value: redirectUrl}
              },
            };
            return response;
        }
        var qsString = ""
        for (var property in queryString){
            qsString += `&${property}=${queryString[property]['value']}`
        }
        if (redirectionMapConWebhook[requestUrl] == '') {
            qsString = qsString.slice(1)
        }
        if (requestUrl || qsString){
            redirectUrl = `https://vexi.mx/?${redirectionMapConWebhook[requestUrl]}${qsString}`;
        }else{
            redirectUrl = `https://vexi.mx/${redirectionMapConWebhook[requestUrl]}${qsString}`;
        }
        
        // Redirige a la URL de destino
        response = {
          statusCode: 301,
          statusDescription: 'Found',
          headers: {
            location: {value: redirectUrl},
            debug: {value: `${qsString}`}
          },
        };
        return response;
    }else if (redirectionMapOrganico.includes(requestUrl)){
        redirectUrl = `https://vexi.mx/?codRef=442`;
        // Redirige a la URL de destino
        response = {
          statusCode: 301,
          statusDescription: 'Found',
          headers: {
            location: {value: redirectUrl}
          },
        };
        return response;
    }

    // Si la URL de origen no está en alguno de los mapeos, continúa con la solicitud normalmente
    return request;
}
