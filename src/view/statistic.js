import { createStatisticRankTemplate } from '@view/statistic-rank.js';
import { createStatisticFiltersTemplate } from '@view/statistic-filters.js';
import { createStatisticListTemplate } from '@view/statistic-list.js';
import { createStatisticChartTemplate } from '@view/statistic-chart.js';

export const createStatisticTemplate = () => (`
  <section class="statistic">
    ${ createStatisticRankTemplate() }
    ${ createStatisticFiltersTemplate() }
    ${ createStatisticListTemplate() }
    ${ createStatisticChartTemplate() }
  </section>
`);
