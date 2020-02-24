<script>
    import nanoid from 'nanoid'

    export const encodeQuery = (queryObject) => {
        return Object.entries(queryObject)
            .filter(([key, value]) => typeof value !== 'undefined')
            .map(
                ([key, value]) =>
                    encodeURIComponent(key) +
                    (value != null ? '=' + encodeURIComponent(value) : '')
            )
            .join('&')
    }

    export default {
        middleware({ redirect, app }) {
            if (app.$auth.loggedIn) {
                redirect('/')
            }
            app.$auth.setStrategy('auth0')
            const strategy = app.$auth.strategy
            const opts = {
                protocol: 'oauth2',
                response_type: strategy.options.response_type,
                access_type: strategy.options.access_type,
                client_id: strategy.options.client_id,
                redirect_uri: strategy._redirectURI,
                scope: strategy._scope,
                // Note: The primary reason for using the state parameter is to mitigate CSRF attacks.
                // https://auth0.com/docs/protocols/oauth2/oauth-state
                state: nanoid()
            }

            if (strategy.options.audience) {
                opts.audience = strategy.options.audience
            }

            // Set Nonce Value if response_type contains id_token to mitigate Replay Attacks
            // More Info: https://openid.net/specs/openid-connect-core-1_0.html#NonceNotes
            // More Info: https://tools.ietf.org/html/draft-ietf-oauth-v2-threatmodel-06#section-4.6.2
            if (opts.response_type.includes('id_token')) {
                // nanoid auto-generates an URL Friendly, unique Cryptographic string
                // Recommended by Auth0 on https://auth0.com/docs/api-auth/tutorials/nonce
                opts.nonce = nanoid()
            }

            app.$auth.$storage.setUniversal(strategy.name + '.state', opts.state)

            const url =
                strategy.options.authorization_endpoint + '?' + encodeQuery(opts)
            return redirect(url)
        }
    }
</script>
