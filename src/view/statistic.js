import { createStatisticRankTemplate } from '@view/statistic-rank.js';
import { createStatisticFiltersTemplate } from '@view/statistic-filters.js';
import { createStatisticListTemplate } from '@view/statistic-list.js';
import { createStatisticChartTemplate } from '@view/statistic-chart.js';

export const createStatisticTemplate = ({ amount, runtime, topGenre }) => (`
  <section class="statistic">
    ${ createStatisticRankTemplate( amount ) }
    ${ createStatisticFiltersTemplate() }
    ${ createStatisticListTemplate( amount, runtime, topGenre ) }
    ${ createStatisticChartTemplate() }
  </section>
`);
