# Dr Tenma: COVID tracking

Yet, another AWS amplify web application for tracking COVID patient symptoms and location

## Features

1. **Fully-baked custom authentication**
2. **User panel to locate nearby cases and log patient's symptoms**
3. **Admin panel to view patients' status and find their location**

## Tech-stack

### Server

- **Authentication**: AWS Cognito
- **Database**: GraphQL DB managed by AWS AppSync
- **Geolocation query**: ElasticSearch
- **Custom backend functions**: AWS Lambda

### Client

- **Create react App (CRA)**: Typescript, React Hooks API, React Context API.
- **User Interface (UI)**: Material-ui
- **Forms**: Formik, Yup
- **Map**: Mapbox

## Demo + Screenshot


## Motivation

Universities and governments have been developing web applications and mobile apps to track COVID patients' status. The goal of this side-project was to review latest React / Backend-as-a-service (BaaS) services while building a software from scratch and deploying the application to production.

## Tech-stack comparison and review

### Firebase v.s. AWS amplify

As of September 2020, clear winner is **Firebase**. For readers who are not aware of Firebase and AWS amplify, they are BaaS service provided by Google and AWS. Firebase started out as a real-time database provider, but was acquired by Google and extended their services as BaaS provider. AWS amplify was a service announced 2~3 years ago for quickly prototyping web/mobile application in AWS.

Note that comparisons below are based on my experience and may not reflect the whole picture.

#### Pros

**Amplify CLI tool**: AWS amplify's CLI tool is **superb**. Traditionally, you would have to manually go to AWS console and mess around with several settings, but having a central place where you can add new resources by simply executing ```amplify add <service>``` is a much better developer experience.

**Quick DB set-up**: With AWS amplify, I believe it took me around ~30 minutes from start to build out a basic GraphQL / REST API.

**Using @directives**: AWS amplify provides a declarative method called directives. You can attach directives like @auth, @key, @searchable, @prediction to your .graphql database schema to add new authorization rule, make data searchable via ElasticSearch, add AI prediciton services, and many more.

**AWS Cognito**: One particular upper-hand that AWS Cognito does have over Firebase is that they provide 2FA (2-factor authention) whereas 2FA in Firebase is still at beta-stage.

***

#### Cons

**Documentation**: At a glance, AWS amplify's documentation looks excellent and for basic usage, it is. However, I had to go to AWS forums, Github issues, and medium articles to hunt down several solutions:

1. Writing custom GraphQL queries
2. Geolocation queries
3. Resolving deployment issue (memory overflow)

**Abstraction and Customizability**: The value proposition of BaaS solution should be _abstraction of underlying backend solution_. My impression for AWS amplify is that its abstraction is as good as it could be. As mentioned above, Amplify CLI does a wonderful job of deploying basic services. But, when it comes to customizing components like access rights and adding backend cloud functions, it requires you to understand different AWS services, how they interact together. In that regard, I don't think AWS amplify does a very good job when it comes to **abstracting** away **AWS** part.

In that regard, Firebase may have couple of limitations and features, but they do a much better job in terms of abstraction. I've been working with Firebase for a few years, but I don't think I rarely visited Google Cloud Project console tied to my Firebase project. Most of my activities were confined to **firebase console, firebase documentation, and my text editor**.

### Formik + Yup

Since the dawn of internet, **_forms_** have been main source of pain and suffering for web developers. Usually, writing form breaks down into 3 main components:

1. Tracking form input
2. Validating user input
3. Submitting user input

The problem boils down to writing a nice react component which performs all three tasks without writing too much boilerplate code.

[Redux Form](https://redux-form.com/8.3.0/) used to be and still is a quite popular solution, but even in my previous projects, I preferred with component states by myself. Although it's a fine solution, I prefer to use **Redux for tracking global app states** like authentiation and navigation states. For me, there's no reason why form state should be shared across the app.

I tried **[Formik](https://formik.org/docs/tutorial) and [Yup](https://github.com/jquense/yup)** for the first time as an alternative and I must say I love it! Let's see how this component solves three chanlleges above.

**1. Tracking form input**:
Tracking form input with Formik is quite simple, all you have to do is initialize your field values and add ```<Field/>``` component inside your form with corressponding name.

```jsx
<Formik
    initialValues={{ firstName: '', lastName: '', email: '' }}
    {...}
>
    <Form>
        <Field name="firstName" type="text" />
        <Field name="lastName" type="text" />
        <Field name="email" type="email" />
    </Form>
</Formik>
```

**2. Form validation**:

Yup really is a simple and declarative library for validating javascript objects. Formik has a nice integration where you can build out a Yup validation schema. All you have to do is inject it right into Formik like this:

```jsx
<Formik
    validationSchema={Yup.object({
         firstName: Yup.string()
           .max(15, 'Must be 15 characters or less')
           .required('Required'),
         lastName: Yup.string()
           .max(20, 'Must be 20 characters or less')
           .required('Required'),
         email: Yup.string()
           .email('Invalid email address')
           .required('Required'),
       })}
>
...
</Formik>
```

**3. Form submission**:
Again also dead simple, just provide a callback function to ```onSubmit``` prop and you're good to go!

```jsx
<Formik
    onSubmit={(values, { setSubmitting }) => {
         setTimeout(() => {
           alert(JSON.stringify(values, null, 2));
           setSubmitting(false);
         }, 400);
    }}
>
...
</Formik>
```

The official [tutorial guide](https://formik.org/docs/tutorial) from Formik website gives a nice overview of how people used to write forms and how using Formik reduces boilerplate. If anyone is interested in using Formik, I would definately give a read.

### Typescript

**Just use it.** If you're still writing your code in plain javascript after experiencing typescript you must be insane. You might think the error messages are annoying and writing types just wastes your time, but it will save you time because:

1. Super-charged autocompletion
2. Type-check at compile time
3. Will self-document your code

### Mapbox vs Google Maps

For me, the clear winner was [Mapbox](https://www.mapbox.com/). Although Google Maps does provide some basic functionality and community-supported react bindings, the official documentation mostly focused on embedding google maps on **static pages**. On the other hand, mapbox's documentation and sdk was much more developer-friendly. **Mapbox has their own npm module out of the box, but Google map doesn't**. On top of that good documentation, crsip UI, their website has guides to pretty much all basic ~ advanced examples.