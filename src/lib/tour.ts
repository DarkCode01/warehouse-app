import { driver } from 'driver.js';

export const tour = driver({
  showProgress: true,
  steps: [
    {
      element: '.all',
      popover: {
        title: 'Welcome to the Smart Audit System!',
        description: `
          <div>
            <p>This tour will show you how to use the system to optimize warehouse inventory audits.</p>
            <p><strong>You'll learn to:</strong></p>
            <ul style="margin: 8px 0; padding-left: 20px;">
              <li>📊 View the risk heatmap</li>
              <li>📋 Create audit plans</li>
              <li>📱 Perform mobile audits</li>
              <li>📈 Analyze statistics</li>
            </ul>
          </div>
        `,
        side: 'bottom',
        align: 'center',
      },
    },
    {
      element: '[data-tour="create-plan"]',
      popover: {
        title: '📋 Create Audit Plan',
        description: `
          <p>Automatically generate smart audit plans:</p>
          <ol style="margin: 8px 0; padding-left: 20px;">
            <li>🎯 Select the <strong>Top N highest risk</strong> bins</li>
            <li>📝 Assign a descriptive name to the plan</li>
            <li>✅ System creates individual tasks for each bin</li>
            <li>📱 Operators can use mobile devices to execute</li>
          </ol>
          <p>Turn risk analysis into concrete action!</p>
        `,
        side: 'left',
        align: 'start',
      },
    },

    {
      element: '[data-tour="audit-plans"]',
      popover: {
        title: '📄 Audit Plans List',
        description: `
          <p>Manage all your audit plans in one place:</p>
          <ul style="margin: 8px 0; padding-left: 20px;">
            <li>📋 <strong>Active Plans:</strong> In progress or pending</li>
            <li>✅ <strong>Completed Plans:</strong> Finished with results</li>
            <li>📊 <strong>Progress:</strong> Completed vs pending tasks</li>
          </ul>
          <p>Keep total control of the audit workflow.</p>
        `,
        side: 'right',
        align: 'center',
      },
    },

    {
      element: '[data-tour="current-plan"]',
      popover: {
        title: '🎯 Current Plan in Execution',
        description: `
          <p>Detailed view of the plan currently being executed:</p>
          <ul style="margin: 8px 0; padding-left: 20px;">
            <li>✅ <strong>Real-time progress:</strong> Completed tasks</li>
            <li>⏳ <strong>Pending:</strong> Bins still to audit</li>
          </ul>
          <p>Perfect for supervisors who need to monitor progress.</p>
        `,
        side: 'bottom',
        align: 'center',
      },
    },
    {
      element: '[data-tour="recompute"]',
      popover: {
        title: '🔄 Recompute Scores',
        description: `
          <p>This button <strong>updates all risk scores</strong> based on:</p>
          <ul style="margin: 8px 0; padding-left: 20px;">
            <li>⏰ Time since last audit</li>
            <li>🔄 Recent activity frequency</li>
            <li>🔧 Inventory adjustment history</li>
            <li>📦 Pallet movements</li>
          </ul>
          <p><strong>Use it after:</strong> completed audits, massive inventory changes, or periodically.</p>
        `,
        side: 'bottom',
        align: 'end',
      },
    },
    {
      element: '[data-tour="heatmap"]',
      popover: {
        title: 'Heatmap - Main View',
        description: `
          <p>The <strong>heatmap</strong> is the heart of the system. It visually shows all warehouse bins:</p>
          <ul style="margin: 8px 0; padding-left: 20px;">
            <li>🟢 <strong>Green:</strong> Low risk (0-33 points)</li>
            <li>🟡 <strong>Yellow:</strong> Medium risk (34-66 points)</li>
            <li>🔴 <strong>Red:</strong> High risk (67-100 points)</li>
          </ul>
          <p>Colors help you quickly identify which areas need priority attention.</p>
        `,
        side: 'right',
        align: 'center',
      },
    },
    {
      element: '[data-tour="stats"]',
      popover: {
        title: '📈 General Statistics',
        description: `
          <p>The statistics panel gives you an overview of the warehouse:</p>
          <ul style="margin: 8px 0; padding-left: 20px;">
            <li>📊 Total bins by risk category</li>
            <li>🎯 Average risk scores</li>
            <li>📅 Bins needing urgent audit</li>
            <li>✅ Percentage of recently audited bins</li>
          </ul>
          <p>Use it to monitor overall inventory health.</p>
        `,
        side: 'bottom',
        align: 'center',
      },
    },
    {
      element: '[data-tour="dashboard"]',
      popover: {
        title: '🎉 Tour Completed!',
        description: `
          <div style="text-align: center;">
            <p><strong>Now you know all the main functions!</strong></p>
            <p>🔄 <strong>Recommended workflow:</strong></p>
            <ol style="text-align: left; margin: 12px 0; padding-left: 20px;">
              <li>Review the heatmap</li>
              <li>Create a plan with high-risk bins</li>
              <li>Execute audits from mobile</li>
              <li>Recompute scores</li>
              <li>Analyze statistics</li>
            </ol>
            <p style="margin-top: 16px;">
              💡 <strong>Tip:</strong> You can repeat this tour anytime from the help menu.
            </p>
          </div>
        `,
      },
    },
  ],
});
