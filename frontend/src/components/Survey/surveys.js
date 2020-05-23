import { create_UUID } from '../../util/util';
export const surveys = [
   {
      id: create_UUID(),
      title: 'Product Feedback Survey Example',
      showProgressBar: 'top',
      pages: [
         {
            elements: [
               {
                  type: 'myquestion',
                  name: 'cq1',
                  text: 'Some Text',
               },
               {
                  type: 'tagbox',
                  name: 'position-tags',
                  title: 'Choose job positions (Select2 Tagbox)...',
                  choices: ['1|Designer', '2|Front-end Developer', '3|Back-end Developer', '4|Database Administrator', '5|System Engineer'],
               },
               {
                  type: 'dropdown',
                  name: 'position-s2',
                  title: 'Choose job position (Select2)...',
                  renderAs: 'select2',
                  choices: ['1|Designer', '2|Front-end Developer', '3|Back-end Developer', '4|Database Administrator', '5|System Engineer'],
               },
               {
                  type: 'rating',
                  name: 'satisfaction',
                  title: 'How satisfied are you with the Product?',
                  mininumRateDescription: 'Not Satisfied',
                  maximumRateDescription: 'Completely satisfied',
               },
               {
                  type: 'rating',
                  name: 'recommend friends',
                  visibleIf: '{satisfaction} > 3',
                  title: 'How likely are you to recommend the Product to a friend or co-worker?',
                  mininumRateDescription: 'Will not recommend',
                  maximumRateDescription: 'I will recommend',
               },
               {
                  type: 'comment',
                  name: 'suggestions',
                  title: 'What would make you more satisfied with the Product?',
               },
            ],
         },
         {
            elements: [
               {
                  type: 'radiogroup',
                  name: 'price to competitors',
                  title: 'Compared to our competitors, do you feel the Product is',
                  choices: ['Less expensive', 'Priced about the same', 'More expensive', 'Not sure'],
               },
               {
                  type: 'radiogroup',
                  name: 'price',
                  title: 'Do you feel our current price is merited by our product?',
                  choices: [
                     'correct|Yes, the price is about right',
                     'low|No, the price is too low for your product',
                     'high|No, the price is too high for your product',
                  ],
               },
               {
                  type: 'multipletext',
                  name: 'pricelimit',
                  title: 'What is the... ',
                  items: [
                     {
                        name: 'mostamount',
                        title: 'Most amount you would every pay for a product like ours',
                     },
                     {
                        name: 'leastamount',
                        title: 'The least amount you would feel comfortable paying',
                     },
                  ],
               },
            ],
         },
         {
            elements: [
               {
                  type: 'text',
                  name: 'email',
                  title: 'Thank you for taking our survey. Please enter your email address, then press the "Submit" button.',
               },
            ],
         },
      ],
   },
];
