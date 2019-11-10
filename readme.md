# tfv-nvd-types
A set of type definitions for the NVD schema. The CVE structures and their types are unmodified (as much as possible) from the NVD public feeds found [here](https://nvd.nist.gov/vuln/data-feeds#JSON_FEED). Each object was broken down as atomic as possible for individual use. Some of the feeds are translated from xml to json, and then properties are assigned. This applies to the cpe dictionary feed and vendor comments feed.

### Nomenclature
The terms and acronyms used are synonymous with NVD. For more information regarding this, please visit the [NVD website](https://nvd.nist.gov/). They have a wealth of information hosted there.

### Feed Types
The current types cover the following feeds:

| feed               	| type 	| version 	| notes                                                       	|
|--------------------	|------	|---------	|-------------------------------------------------------------	|
| cve                	| json 	| 1.1     	| identical match                                             	|
| vendor comments    	| xml  	| *       	| converted to json, namespaces removed, some values inferred 	|
| official cpe dict. 	| xml  	| 2.3     	| converted to json, namespaces removed, some values inferred 	|
