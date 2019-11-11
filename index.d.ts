/**
 * National Vulnerability Database Schema.
 */
export namespace NVD {
    /**
     * Common types across NVD objects.
     */
    export namespace Common {
        /**
         * Description of some value (used on multiple objects).
         *
         * @export
         * @interface IDescription
         */
        export interface IDescription {
            /**
             * Language of the description.
             * E.g. 'EN'
             *
             * @type {string}
             * @memberof IDescription
             */
            lang: string,
            /**
             * The content of the description.
             *
             * @type {string}
             * @memberof IDescription
             */
            value: string
        }
    }
    /**
     * Common Vulnerability Enumerations.
     */
    export namespace CVE {
        /**
         * Top most container of the NVD CVE json feed.
         * Contains some meta about the feed as well as
         * the cve items.
         *
         * @export
         * @interface ICveFeed
         */
        export interface ICveFeed {
            /**
             * Type of data in the feed.
             *
             * @type {string}
             * @memberof ICveFeed
             */
            CVE_data_type: string,
            /**
             * Format of the data in the feed.
             *
             * @type {string}
             * @memberof ICveFeed
             */
            CVE_data_format: string,
            /**
             * Version of the data format & type.
             *
             * @type {number}
             * @memberof ICveFeed
             */
            CVE_data_version: number,
            /**
             * Number of cves in the CVE_Items list.
             *
             * @type {number}
             * @memberof ICveFeed
             */
            CVE_data_numberOfCVEs: number,
            /**
             * Timestamp the feed was created/updated.
             *
             * @type {string}
             * @memberof ICveFeed
             */
            CVE_data_timestamp: string
            /**
             * List of cve items.
             *
             * @type {ICveItem[]}
             * @memberof ICveFeed
             */
            CVE_Items: ICveItem[]
        }
        /**
         * A vendor supplied comment for a given cve.
         *
         * @export
         * @interface ICveComment
         */
        export interface ICveComment {
            /**
             * The content of the comment.
             *
             * @type {string}
             * @memberof ICveComment
             */
            value: string
            /**
             * The name/id of the cve. 
             * E.g. CVE-0000-1111
             *
             * @type {string}
             * @memberof ICveComment
             */
            cvename: string,
            /**
             * The organization the cve belongs to.
             *
             * @type {string}
             * @memberof ICveComment
             */
            organization: string,
            /**
             * Last modified date of the cve.
             * YYYY-MM-DD format.
             *
             * @type {string}
             * @memberof ICveComment
             */
            lastmodified: string,
            /**
             * Name of the person that provided the comment.
             *
             * @type {string}
             * @memberof ICveComment
             */
            contributor?: string
        }
        /**
         * Provides reference data about a given cve
         * such as a url to the vulnerability meta about
         * that source.
         *
         * @export
         * @interface ICveReference
         */
        export interface ICveReference {
            /**
             * The url of the reference. Can be any valid url.
             *
             * @type {string}
             * @memberof ICveReference
             */
            url: string,
            /**
             * Name of the url. Common for it to be the same
             * as the url itself.
             *
             * @type {string}
             * @memberof ICveReference
             */
            name: string,
            /**
             * Source of the reference, can be any value.
             *
             * @type {string}
             * @memberof ICveReference
             */
            refsource: string,
            /**
             * List of tags for the reference. Can be any
             * value.
             *
             * @type {string[]}
             * @memberof ICveReference
             */
            tags: string[]
        }
        /**
         * Meta data for a given CVE item.
         */
        export interface ICveMetaData {
            /**
             * The id of the CVE.
             *
             * @type {string}
             * @memberof ICveMetaData
             */
            ID: string,
            /**
             * The assigner of the CVE.
             * Fixed value.
             *
             * @type {string}
             * @memberof ICveMetaData
             */
            ASSIGNER: 'cve@mitre.org'
        }
        /**
         * Nested object containing a list of CWEs for 
         * a given CVE.
         *
         * @export
         * @interface IProblemTypeData
         */
        export interface IProblemTypeData {
            problemtype_data: [{
                description: Common.IDescription[]
            }]
        }
        /**
         * Cve item container.
         *
         * @export
         * @interface ICve
         */
        export interface ICve {
            /**
             * Type of the current CVE schema.
             * Fixed value.
             * @type {string}
             * @memberof ICve
             */
            data_type: 'CVE',
            /**
             * Format of the current CVE schema.
             * Fixed value.
             * @type {string}
             * @memberof ICve
             */
            data_format: 'MITRE',
            /**
             * Version of the current CVE schema.
             *
             * @type {string}
             * @memberof ICve
             */
            data_version: string,
            /**
             * Metadata about a cve including the id
             * and assigner.
             *
             * @type {ICveMetaData}
             * @memberof ICve
             */
            CVE_data_meta: ICveMetaData,
            /**
             * Container for nested CWEs data.
             *
             * @type {IProblemTypeData}
             * @memberof ICve
             */
            problemtype: IProblemTypeData,
            /**
             * Container for a list of reference data 
             * about the CVE.
             *
             * @memberof ICve
             */
            references: {
                reference_data: ICveReference[]
            },
            /**
             * Container for a list of description data
             * about the CVE.
             *
             * @memberof ICve
             */
            description: {
                description_data: Common.IDescription[]
            }
        }
        /**
         * CPE match values.
         *
         * @export
         * @interface ICpeMatch
         */
        export interface ICpeMatch {
            /**
             * If the CPE is currently vulnerable.
             *
             * @type {boolean}
             * @memberof ICpeMatch
             */
            vulnerable: boolean,
            /**
             * Uri identifying the CPE via 23 format.
             *
             * @type {string}
             * @memberof ICpeMatch
             */
            cpe23Uri: string
        }
        /**
         * Container for a list of matching CPEs
         * and the operator for matching.
         *
         * @export
         * @interface ICpeConfigurationNode
         */
        export interface ICpeConfigurationNode {
            /**
             * Operator for how the CPE should be
             * matched.
             *
             * @type {string}
             * @memberof ICpeConfigurationNode
             */
            operator: 'AND' | 'OR',
            /**
             * List of matching CPEs.
             *
             * @type {ICpeMatch[]}
             * @memberof ICpeConfigurationNode
             */
            cpe_match: ICpeMatch[]
        }
        /**
         * Container for all CPE data for a given
         * CVE.
         *
         * @export
         * @interface ICpeConfiguration
         */
        export interface ICpeConfiguration {
            /**
             * Version of the CVE that the CPEs apply to.
             *
             * @type {string}
             * @memberof ICpeConfiguration
             */
            CVE_data_version: string,
            /**
             * List of cpe operators and their matching
             * cpe23 uris.
             *
             * @type {ICpeConfigurationNode[]}
             * @memberof ICpeConfiguration
             */
            nodes: ICpeConfigurationNode[]
        }
        /**
         * Details of the CVSSV3 score for a given CVE.
         *
         * @export
         * @interface ICVSSV3
         */
        export interface ICVSSV3 {
            /**
             * Version of the score.
             *
             * @type {string}
             * @memberof ICVSSV3
             */
            version: string,
            /**
             * Value that can be used for calculation metrics.
             *
             * @type {string}
             * @memberof ICVSSV3
             */
            vectorString: string,
            /**
             * The attack vector for this score.
             *
             * @type {('ADJACENT_NETWORK' | 'LOCAL' | 'NETWORK' | 'PHYSICAL')}
             * @memberof ICVSSV3
             */
            attackVector: 'ADJACENT_NETWORK' | 'LOCAL' | 'NETWORK' | 'PHYSICAL'
            /**
             * The complexity for this score.
             *
             * @type {('HIGH' | 'LOW')}
             * @memberof ICVSSV3
             */
            attackComplexity: 'HIGH' | 'LOW',
            /**
             * The privileges required for this score.
             *
             * @type {('HIGH' | 'LOW' | 'NONE')}
             * @memberof ICVSSV3
             */
            privilegesRequired: 'HIGH' | 'LOW' | 'NONE',
            /**
             * The user interaction included for this score.
             *
             * @type {('NONE' | 'REQUIRED')}
             * @memberof ICVSSV3
             */
            userInteraction: 'NONE' | 'REQUIRED',
            /**
             * The scope of the current state of the score.
             *
             * @type {('CHANGED' | 'UNCHANGED')}
             * @memberof ICVSSV3
             */
            scope: 'CHANGED' | 'UNCHANGED',
            /**
             * The level of impact to confidentialy included in this score.
             *
             * @type {('HIGH' | 'LOW' | 'NONE')}
             * @memberof ICVSSV3
             */
            confidentialityImpact: 'HIGH' | 'LOW' | 'NONE',
            /**
             * The impact of integrity for the cve for this score.
             *
             * @type {('HIGH' | 'LOW' | 'NONE')}
             * @memberof ICVSSV3
             */
            integrityImpact: 'HIGH' | 'LOW' | 'NONE',
            /**
             * The impact of availability for the cve for this score.
             *
             * @type {('HIGH' | 'LOW' | 'NONE')}
             * @memberof ICVSSV3
             */
            availabilityImpact: 'HIGH' | 'LOW' | 'NONE',
            /**
             * Calculated base score.
             *
             * @type {number}
             * @memberof ICVSSV3
             */
            baseScore: number,
            /**
             * Minimum severity of this score.
             *
             * @type {('CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW')}
             * @memberof ICVSSV3
             */
            baseSeverity: 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW'
        }
        /**
         * Container for all information regarding a CVSS3
         * score for a given CVE.
         *
         * @export
         * @interface ICveImpactBaseMetricV3
         */
        export interface ICveImpactBaseMetricV3 {
            /**
             * The details for the score.
             *
             * @type {ICVSSV3}
             * @memberof ICveImpactBaseMetricV3
             */
            cvssV3: ICVSSV3,
            /**
             * Calculated score for exploitability.
             *
             * @type {number}
             * @memberof ICveImpactBaseMetricV3
             */
            exploitabilityScore: number,
            /**
             * Calculated score for impact.
             *
             * @type {number}
             * @memberof ICveImpactBaseMetricV3
             */
            impactScore: number
        }
        /**
         * Details of the CVSSV2 score for a given CVE.
         *
         * @export
         * @interface ICVSSV2
         */
        export interface ICVSSV2 {
            /**
             * Version of the score.
             *
             * @type {string}
             * @memberof ICVSSV2
             */
            version: string,
            /**
             * Can be used for calculation.
             *
             * @type {string}
             * @memberof ICVSSV2
             */
            vectorString: string,
            /**
             * Access vector (similar to attack in v3) for this score.
             *
             * @type {('ADJACENT_NETWORK' | 'LOCAL' | 'NETWORK')}
             * @memberof ICVSSV2
             */
            accessVector: 'ADJACENT_NETWORK' | 'LOCAL' | 'NETWORK',
            /**
             * Complexity of the score.
             *
             * @type {('HIGH' | 'MEDIUM' | 'LOW')}
             * @memberof ICVSSV2
             */
            accessComplexity: 'HIGH' | 'MEDIUM' | 'LOW',
            /**
             * Authentication used in this score.
             *
             * @type {('MULTIPLE' | 'SINGLE' | 'NONE')}
             * @memberof ICVSSV2
             */
            authentication: 'MULTIPLE' | 'SINGLE' | 'NONE',
            /**
             * The impact of confidentialy for the cve for this score.
             *
             * @type {('COMPLETE' | 'NONE' | 'PARTIAL')}
             * @memberof ICVSSV2
             */
            confidentialityImpact: 'COMPLETE' | 'NONE' | 'PARTIAL',
            /**
             * The impact of integrity for the cve for this score.
             *
             * @type {('COMPLETE' | 'NONE' | 'PARTIAL')}
             * @memberof ICVSSV2
             */
            integrityImpact: 'COMPLETE' | 'NONE' | 'PARTIAL',
            /**
             * The impact of availability for the cve for this score.
             *
             * @type {('COMPLETE' | 'NONE' | 'PARTIAL')}
             * @memberof ICVSSV2
             */
            availabilityImpact: 'COMPLETE' | 'NONE' | 'PARTIAL',
            /**
             * Calculated score for the cve.
             *
             * @type {number}
             * @memberof ICVSSV2
             */
            baseScore: number
        }
        /**
         * Container for all information regarding a CVSS2
         * score for a given CVE.
         *
         * @export
         * @interface ICveImpactBaseMetricV2
         */
        export interface ICveImpactBaseMetricV2 {
            /**
             * Details of the v2 score.
             *
             * @type {ICVSSV2}
             * @memberof ICveImpactBaseMetricV2
             */
            cvssV2: ICVSSV2,
            /**
             * Severity of this score.
             *
             * @type {('HIGH' | 'LOW' | 'MEDIUM')}
             * @memberof ICveImpactBaseMetricV2
             */
            severity: 'HIGH' | 'LOW' | 'MEDIUM',
            /**
             * Inidicated ability to exploit the cve.
             *
             * @type {number}
             * @memberof ICveImpactBaseMetricV2
             */
            exploitabilityScore: number,
            /**
             * Indicates impact for the cve.
             *
             * @type {number}
             * @memberof ICveImpactBaseMetricV2
             */
            impactScore: number,
            /**
             * Insufficient information provided for score.
             *
             * @type {boolean}
             * @memberof ICveImpactBaseMetricV2
             */
            acInsufInfo: boolean,
            /**
             * If score indicates the cve obtained root privilage. 
             *
             * @type {boolean}
             * @memberof ICveImpactBaseMetricV2
             */
            obtainAllPrivilege: boolean,
            /**
             * If score indicates the cve obtained a user privilage. 
             *
             * @type {boolean}
             * @memberof ICveImpactBaseMetricV2
             */
            obtainUserPrivilege: boolean,
            /**
             * If score indicates the cve obtained some other privilage. 
             *
             * @type {boolean}
             * @memberof ICveImpactBaseMetricV2
             */
            obtainOtherPrivilege: boolean,
            /**
             * If the score includes a user interaction.
             *
             * @type {boolean}
             * @memberof ICveImpactBaseMetricV2
             */
            userInteractionRequired: boolean
        }
        /**
         * Container for all the cvss scores for the cve.
         *
         * @export
         * @interface ICveImpact
         */
        export interface ICveImpact {
            /**
             * Contains all the cvss3 information.
             *
             * @type {ICveImpactBaseMetricV3}
             * @memberof ICveImpact
             */
            baseMetricV3?: ICveImpactBaseMetricV3,
            /**
             * Contains all the cvss2 information.
             *
             * @type {ICveImpactBaseMetricV2}
             * @memberof ICveImpact
             */
            baseMetricV2?: ICveImpactBaseMetricV2
        }
        /**
         * Contains all information for a cve.
         *
         * @export
         * @interface ICveItem
         */
        export interface ICveItem {
            /**
             * The cve information.
             *
             * @type {ICve}
             * @memberof ICveItem
             */
            cve: ICve
            /**
             * The cpe information.
             *
             * @type {ICpeConfiguration}
             * @memberof ICveItem
             */
            configurations: ICpeConfiguration
            /**
             * The cvss scores.
             *
             * @type {ICveImpact}
             * @memberof ICveItem
             */
            impact?: ICveImpact
            /**
             * The date the cve was published.
             *
             * @type {string}
             * @memberof ICveItem
             */
            publishedDate: string //ISO8601
            /**
             * The most recent date the cve was changed.
             *
             * @type {string}
             * @memberof ICveItem
             */
            lastModifiedDate: string //ISO8601
        }
    }
    /**
     * Common Product Enumerations.
     */
    export namespace CPE {
        /**
         * Contains information for a cpe reference.
         *
         * @export
         * @interface ICpeReference
         */
        export interface ICpeReference {
            /**
             * Name/title of the reference.
             *
             * @type {string}
             * @memberof ICpeReference
             */
            value: string,
            /**
             * The url for the reference.
             *
             * @type {string}
             * @memberof ICpeReference
             */
            href: string
        }
        /**
         * Information specifically for a v2.3 cpe.
         *
         * @export
         * @interface ICpe23Item
         */
        export interface ICpe23Item {
            /**
             * Name of the cpe for this version.
             *
             * @type {string}
             * @memberof ICpe23Item
             */
            name: string,
            /**
             * Details regarding the deprecation.
             *
             * @memberof ICpe23Item
             */
            deprecation?: {
                /**
                 * The date of the deprecation.
                 *
                 * @type {string}
                 */
                date: string,
                /**
                 * Information about the person 
                 * who assigned a deprecated status.
                 *
                 */
                'deprecated-by': {
                    name: string,
                    type: string
                }
            }
        }
        /**
         * Contains information regarding a cpe.
         *
         * @export
         * @interface ICpeItem
         */
        export interface ICpeItem {
            /**
             * Name of the cpe.
             *
             * @type {string}
             * @memberof ICpeItem
             */
            name: string,
            /**
             * If the cpe is deprecated.
             *
             * @type {boolean}
             * @memberof ICpeItem
             */
            deprecated?: boolean,
            /**
             * Date the cpe was deprecated.
             *
             * @type {string}
             * @memberof ICpeItem
             */
            deprecation_date?: string
            /**
             * Title of the cpe.
             *
             * @type {Common.IDescription}
             * @memberof ICpeItem
             */
            title: Common.IDescription,
            /**
             * References for this cpe.
             *
             * @memberof ICpeItem
             */
            references: {
                reference: ICpeReference[] | ICpeReference
            },
            /**
             * Specific information for v2.3 of this cpe.
             *
             * @type {ICpe23Item}
             * @memberof ICpeItem
             */
            'cpe23-item': ICpe23Item
        }
    }
}