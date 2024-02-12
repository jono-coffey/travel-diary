# Deployment

## General

- Install `eas-cli` using npm (`npm install -g eas-cli`)
- Build from Master
- All env vars are pulled from expo during eas build. All you need to do is run the commands below.

### Configuration (already done)

`eas build:configure`

# iOS deployment

Steps:

- increment version in `app.json`
- Update the Apple Id to your Apple Id in `eas.json`. Your Apple is most likely `name.surname@entelect.co.uk`
- `eas build --platform ios` and follow the steps:
  - log in to your apple account via the cli
  - `new apple distribution cert (NO)` - one should already be generated (identifies you, and allows you to support to the store - basically to ensure that the app code originates from the organisation)
  - `new apple provisioning profile (NO)` - one should already be generated
  - Set up push notifications (NO) - unless we introduce push notifications
  - Build gets uploaded to eas build (<https://expo.dev/accounts/entelect-uk/projects/coach-connect/builds>)
- Once built, prepare to publish
  `eas submit -p ios --latest` (specify which build to take)
   if asked about API key, use existing

- this pushes the artifact to the app store. it takes some time around 10 mins
  it should be processing under test flight (<https://appstoreconnect.apple.com/apps/6476618464/testflight/ios>)
  May be prompted with missing compliance information on testflight, currently there's no encryption on the actual app, so select no encryption :(

# Android deployment

Steps:

- increment android version code in `app.json`
- increment version in `app.json`
- `eas build --platform android`
- update `eas.json` `serviceAccountKeyPath` to point the service account key
- after the build has been completed, run `eas submit -p android --latest`
- this releases to internal testers. update the testers list on the Google Play Console if required

### Apple meta

Distribution cert and provisioning profile

```
    Project Credentials Configuration

    Project                   @entelect-uk/coach-connect
    Bundle Identifier         uk.co.entelect.coachconnect
                              
    App Store Configuration   
                              
    Distribution Certificate  
    Serial Number             54779969BC72D83EFBC4F4BF8C7373D3
    Expiration Date           Thu, 23 Jan 2025 13:39:35 UTC
    Apple Team                359TWC7W9Z (ENTELECT UNITED KINGDOM LIMITED (Company/Organization))
    Updated                   3 minutes ago
                              
    Provisioning Profile      
    Developer Portal ID       6X8FM85W3C
    Status                    active
    Expiration                Thu, 23 Jan 2025 13:39:35 UTC
    Apple Team                359TWC7W9Z (ENTELECT UNITED KINGDOM LIMITED (Company/Organization))
    Updated                   1 second ago
```

Apple App Store Connect  key

```
  Using Api Key ID: 59S283VXNT ([Expo] EAS Submit 2KpslOjkLL)

  ASC App ID:                 6476618464
  Project ID:                 b0d3d69a-b707-4ae4-aae5-0fa619b225be
  App Store Connect API Key:  
      Key Name  :  [Expo] EAS Submit 2KpslOjkLL
      Key ID    :  59S283VXNT
      Key Source:  EAS servers
  Build:                      
      Build ID    :  8e533192-ed56-4d4f-9b5a-bf52e6818a6c
      Build Date  :  1/25/2024, 1:30:45 AM
      App Version :  1.0.0
      Build number:  1
```
