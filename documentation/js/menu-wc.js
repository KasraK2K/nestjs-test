'use strict';


customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">lead-app documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-toggle="collapse" ${ isNormalMode ?
                                'data-target="#modules-links"' : 'data-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link">AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-AppModule-ed1fc117618d23c034b0b96a07e30690"' : 'data-target="#xs-controllers-links-module-AppModule-ed1fc117618d23c034b0b96a07e30690"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AppModule-ed1fc117618d23c034b0b96a07e30690"' :
                                            'id="xs-controllers-links-module-AppModule-ed1fc117618d23c034b0b96a07e30690"' }>
                                            <li class="link">
                                                <a href="controllers/AppController.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">AppController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-AppModule-ed1fc117618d23c034b0b96a07e30690"' : 'data-target="#xs-injectables-links-module-AppModule-ed1fc117618d23c034b0b96a07e30690"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AppModule-ed1fc117618d23c034b0b96a07e30690"' :
                                        'id="xs-injectables-links-module-AppModule-ed1fc117618d23c034b0b96a07e30690"' }>
                                        <li class="link">
                                            <a href="injectables/AppService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>AppService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/LeadManagerModule.html" data-type="entity-link">LeadManagerModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-LeadManagerModule-efd68b96cb9fbc5662834b366e86e881"' : 'data-target="#xs-controllers-links-module-LeadManagerModule-efd68b96cb9fbc5662834b366e86e881"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-LeadManagerModule-efd68b96cb9fbc5662834b366e86e881"' :
                                            'id="xs-controllers-links-module-LeadManagerModule-efd68b96cb9fbc5662834b366e86e881"' }>
                                            <li class="link">
                                                <a href="controllers/LeadManagerController.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">LeadManagerController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-LeadManagerModule-efd68b96cb9fbc5662834b366e86e881"' : 'data-target="#xs-injectables-links-module-LeadManagerModule-efd68b96cb9fbc5662834b366e86e881"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-LeadManagerModule-efd68b96cb9fbc5662834b366e86e881"' :
                                        'id="xs-injectables-links-module-LeadManagerModule-efd68b96cb9fbc5662834b366e86e881"' }>
                                        <li class="link">
                                            <a href="injectables/LeadManagerService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>LeadManagerService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/LeadModule.html" data-type="entity-link">LeadModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-LeadModule-6d56b64bebd807a03f27852e61130030"' : 'data-target="#xs-controllers-links-module-LeadModule-6d56b64bebd807a03f27852e61130030"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-LeadModule-6d56b64bebd807a03f27852e61130030"' :
                                            'id="xs-controllers-links-module-LeadModule-6d56b64bebd807a03f27852e61130030"' }>
                                            <li class="link">
                                                <a href="controllers/LeadController.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">LeadController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-LeadModule-6d56b64bebd807a03f27852e61130030"' : 'data-target="#xs-injectables-links-module-LeadModule-6d56b64bebd807a03f27852e61130030"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-LeadModule-6d56b64bebd807a03f27852e61130030"' :
                                        'id="xs-injectables-links-module-LeadModule-6d56b64bebd807a03f27852e61130030"' }>
                                        <li class="link">
                                            <a href="injectables/LeadService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>LeadService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                </ul>
                </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#controllers-links"' :
                                'data-target="#xs-controllers-links"' }>
                                <span class="icon ion-md-swap"></span>
                                <span>Controllers</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="controllers-links"' : 'id="xs-controllers-links"' }>
                                <li class="link">
                                    <a href="controllers/AppController.html" data-type="entity-link">AppController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/LeadController.html" data-type="entity-link">LeadController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/LeadManagerController.html" data-type="entity-link">LeadManagerController</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#classes-links"' :
                            'data-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/AssignLeadToManagerDto.html" data-type="entity-link">AssignLeadToManagerDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateLeadManagerDto.html" data-type="entity-link">CreateLeadManagerDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/LeadCredentialsDto.html" data-type="entity-link">LeadCredentialsDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/LeadEntity.html" data-type="entity-link">LeadEntity</a>
                            </li>
                            <li class="link">
                                <a href="classes/LeadManagerEntity.html" data-type="entity-link">LeadManagerEntity</a>
                            </li>
                            <li class="link">
                                <a href="classes/LeadManagerRepository.html" data-type="entity-link">LeadManagerRepository</a>
                            </li>
                            <li class="link">
                                <a href="classes/LeadRepository.html" data-type="entity-link">LeadRepository</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateLeadManagerDto.html" data-type="entity-link">UpdateLeadManagerDto</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#injectables-links"' :
                                'data-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/AppService.html" data-type="entity-link">AppService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/LeadManagerService.html" data-type="entity-link">LeadManagerService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/LeadService.html" data-type="entity-link">LeadService</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#interfaces-links"' :
                            'data-target="#xs-interfaces-links"' }>
                            <span class="icon ion-md-information-circle-outline"></span>
                            <span>Interfaces</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                            <li class="link">
                                <a href="interfaces/BulkInsertResponseInterface.html" data-type="entity-link">BulkInsertResponseInterface</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ErrorReasonInterface.html" data-type="entity-link">ErrorReasonInterface</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/LeadInterface.html" data-type="entity-link">LeadInterface</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/SearchLeadManagerAndCount.html" data-type="entity-link">SearchLeadManagerAndCount</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#miscellaneous-links"'
                            : 'data-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/functions.html" data-type="entity-link">Functions</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});