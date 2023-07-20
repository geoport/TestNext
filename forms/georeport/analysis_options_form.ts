import { FormField } from 'models/FormField';
import createMapList from 'lib/create_map';
import BaseForm from 'models/Form';

export class AnalysisOptionsForm extends BaseForm {
    coverPage = new FormField({ id: 'coverPage', label: 'Kapak Sayfası' });
    contentPage = new FormField({ id: 'contentPage', label: 'İçindekiler' });
    figuresTablesPage = new FormField({
        id: 'figuresTablesPage',
        label: 'Şekiller ve Tablolar',
    });
    approvalsPage = new FormField({
        id: 'approvalsPage',
        label: 'Onay Sayfası',
    });
    introductionPage = new FormField({
        id: 'introductionPage',
        label: 'Giriş',
    });
    constructionFieldPage = new FormField({
        id: 'constructionFieldPage',
        label: 'İnşaat Sahası Hakkında Bilgiler',
    });
    structuralInformationPage = new FormField({
        id: 'structuralInformationPage',
        label: 'Yapı Hakkında Bilgiler',
    });
    soilInvestigationPage = new FormField({
        id: 'soilInvestigationPage',
        label: 'Mevcut Zemin Araştırmaları',
    });
    additionalSoilInvestigationPage = new FormField({
        id: 'additionalSoilInvestigationPage',
        label: 'İlave Zemin Araştırmaları',
    });
    idealizedSoilPage = new FormField({
        id: 'idealizedSoilPage',
        label: 'İdealize Zemin Profili ve Yeraltı Suyu Durumları',
    });
    parameterSelectionPage = new FormField({
        id: 'parameterSelectionPage',
        label: 'Geoteknik Tasarım Parametrelerinin Tespiti',
    });
    designSpectrumAnalysis = new FormField({
        id: 'designSpectrumAnalysis',
        label: 'Tasarım Spektrumu',
    });
    localSoilClassAnalysis = new FormField({
        id: 'localSoilClassAnalysis',
        label: 'Yerel Zemin Sınıfı Analizi',
    });
    liquefactionAnalysis = new FormField({
        id: 'liquefactionAnalysis',
        label: 'Sıvılaşma Analizi',
    });
    settlementAnalysis = new FormField({
        id: 'settlementAnalysis',
        label: 'Oturma Analizi',
    });
    horizontalSlidingAnalysis = new FormField({
        id: 'horizontalSlidingAnalysis',
        label: 'Temelin Yatayda Kayma Analizi',
    });
    bearingCapacityAnalysis = new FormField({
        id: 'bearingCapacityAnalysis',
        label: 'Taşıma Kapasitesi Analizi',
    });
    soilCoefficientAnalysis = new FormField({
        id: 'soilCoefficientAnalysis',
        label: 'Zemin Yatak Katsayısı Analizi',
    });
    effectiveDepthAnalysis = new FormField({
        id: 'effectiveDepthAnalysis',
        label: 'Sondaj Derinliği Analizi',
    });
    deepFoundationPage = new FormField({
        id: 'deepFoundationPage',
        label: 'Derin Temeller',
    });
    groundImprovementPage = new FormField({
        id: 'groundImprovementPage',
        label: 'Zemin İyileştirme Alternatifleri',
    });
    foundationSuggestionPage = new FormField({
        id: 'foundationSuggestionPage',
        label: 'Önerilen Temel Sistemleri',
    });
    swellingPotentialAnalysis = new FormField({
        id: 'swellingPotentialAnalysis',
        label: 'Şişme Potansiyeli Analizi',
    });
    retainingSystemsPage = new FormField({
        id: 'retainingSystemsPage',
        label: 'İksa Sistemi ve Şev Duraylılık Analizlerinin Değerlendirilmesi',
    });
    resultsPage = new FormField({
        id: 'resultsPage',
        label: 'Sonuç ve Öneriler',
    });
    referancesPage = new FormField({
        id: 'referancesPage',
        label: 'Yardımcı Kaynaklar',
    });
    anyOfFields = {
        errorMessage: 'En az bir analiz seçmelisiniz',
        fields: [
            this.designSpectrumAnalysis,
            this.localSoilClassAnalysis,
            this.liquefactionAnalysis,
            this.settlementAnalysis,
            this.horizontalSlidingAnalysis,
            this.bearingCapacityAnalysis,
            this.soilCoefficientAnalysis,
            this.effectiveDepthAnalysis,
            this.swellingPotentialAnalysis,
        ],
    };
}

export class LocalSoilClassForm extends BaseForm {
    localSoilClassBySPT = new FormField({
        id: 'localSoilClassBySPT',
        label: 'SPT ile hesapla',
    });
    localSoilClassByVS = new FormField({
        id: 'localSoilClassByVS',
        label: 'Kayma dalgası hızı ile hesapla',
    });
    localSoilClassByCu = new FormField({
        id: 'localSoilClassByCu',
        label: 'C<sub>u</sub> ile hesapla',
    });
    anyOfFields = {
        errorMessage:
            'En az bir yerel zemin sınıfı hesaplama yöntemi seçmelisiniz',
        fields: [
            this.localSoilClassByCu,
            this.localSoilClassBySPT,
            this.localSoilClassByVS,
        ],
    };
}

export class LiquefactionForm extends BaseForm {
    liquefactionBySPT = new FormField({
        id: 'liquefactionBySPT',
        label: 'SPT ile hesapla',
    });
    liquefactionByVS = new FormField({
        id: 'liquefactionByVS',
        label: 'Kayma dalgası hızı ile hesapla',
    });
    liquefactionByCPT = new FormField({
        id: 'liquefactionByCPT',
        label: 'CPT ile hesapla',
    });
    anyOfFields = {
        errorMessage: 'En az bir sıvılaşma analizi yöntemi seçmelisiniz',
        fields: [
            this.liquefactionByCPT,
            this.liquefactionBySPT,
            this.liquefactionByVS,
        ],
    };
}

export class BearingCapacityForm extends BaseForm {
    bearingCapacityByVesic = new FormField({
        id: 'bearingCapacityByVesic',
        label: "TBDY 2018'e göre hesapla",
    });
    bearingCapacityByVS = new FormField({
        id: 'bearingCapacityByVS',
        label: 'Kayma dalgası hızı ile hesapla',
    });
    bearingCapacityByPressuremeter = new FormField({
        id: 'bearingCapacityByPressuremeter',
        label: 'Presiyometre ile hesapla',
    });
    bearingCapacityByRQD = new FormField({
        id: 'bearingCapacityByRQD',
        label: 'Nokta yükleme deneyi ile hesapla',
    });
    bearingCapacityShortTerm = new FormField({
        id: 'bearingCapacityShortTerm',
        label: 'Kısa dönem için hesapla',
    });
    bearingCapacityLongTerm = new FormField({
        id: 'bearingCapacityLongTerm',
        label: 'Uzun dönem için hesapla',
    });
    anyOfFields = {
        errorMessage:
            'En az bir taşıma kapasitesi analizi yöntemi seçmelisiniz',
        fields: [
            this.bearingCapacityByPressuremeter,
            this.bearingCapacityByVesic,
            this.bearingCapacityByVS,
            this.bearingCapacityByRQD,
        ],
    };
}

export class SettlementForm extends BaseForm {
    consolidationMethods = [
        { value: 'MV', key: 'Hacimsel sıkışma katsayısı ile' },
        { value: 'GP', key: 'Ön yükleme basıncı ile' },
    ];
    elasticSettlementAnalysis = new FormField({
        id: 'elasticSettlementAnalysis',
        label: 'Ani oturma',
    });
    consolidationSettlementAnalysis = new FormField({
        id: 'consolidationSettlementAnalysis',
        label: 'Konsolidasyon oturması',
    });
    consolidationMethod = new FormField({
        id: 'consolidationMethod',
        label: 'Konsolidasyon analizi yöntemi',
        choices: this.consolidationMethods,
    });
    anyOfFields = {
        errorMessage: 'En az bir oturma analizi yöntemi seçmelisiniz',
        fields: [
            this.elasticSettlementAnalysis,
            this.consolidationSettlementAnalysis,
        ],
    };
}

export class SoilCoefficientForm extends BaseForm {
    soilCoefficientBySettlement = new FormField({
        id: 'soilCoefficientBySettlement',
        label: 'Oturma ile hesapla',
    });
    soilCoefficientByBearingCapacity = new FormField({
        id: 'soilCoefficientByBearingCapacity',
        label: 'Taşıma kapasitesi ile hesapla',
    });
    anyOfFields = {
        errorMessage: 'En az bir yatak katsayısı analizi yöntemi seçmelisiniz',
        fields: [
            this.soilCoefficientBySettlement,
            this.soilCoefficientByBearingCapacity,
        ],
    };
}

export class LoadingForm extends BaseForm {
    loadingCase = new FormField({
        id: 'loadingCase',
        label: 'Yükleme Durumu',
        choices: createMapList(['G+Q', '1.4G+1.6Q', 'G+Q+E/0.9G+E']),
    });
    loadingValue = new FormField({
        id: 'loadingValue',
        label: 'Kullanılacak Değer',
        choices: createMapList(['minimum', 'ortalama', 'maksimum']),
    });
}
