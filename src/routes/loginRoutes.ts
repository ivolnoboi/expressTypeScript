import {Router, Request, Response, NextFunction} from 'express';
import { User } from '../User';
import { users, includeUser } from '../users';

interface RequestWithBody extends Request {
    body: {[key: string]: string | undefined}
}

function requireAuth(req: Request, res: Response, next: NextFunction) {
    if (req.session && req.session.loggedIn) {
        next();
        return;
    }

    res.status(403);
    res.send('Access is denied');
}

const router = Router();

router.get('/login', (req: Request, res: Response) => {
    res.send(`
    <form method="POST">
        <div>
            <label>Email</label>
            <input name="email" />
        </div>
        <div>
            <label>Password</label>
            <input type="password" name="password" />
        </div>
        <button>Submit</button>
    </form>
        `);
});

router.post('/login', (req: RequestWithBody, res: Response) => {
    const { email, password } = req.body;

    // if email and password correct
    if (email && password){

        try {
            const currentUser = new User(email, password);

            // if this user exists
            if(includeUser(users, currentUser)){
                // Show that the user is logged in
                req.session = { loggedIn: true };

                // Redirect to the root route
                res.redirect('/');
            } else { res.send('There is no user with these email and password'); }
        } catch (e) {
            res.send(`
                <div>
                    <div>${(e as Error).message}</div>
                    <a href="/login">Login</a>
                </div>
            `);
            return;
        }
        
    } else {
        res.send('Invalid email or password');
    }
});

router.get('/', (req: Request, res: Response) => {
    if (req.session && req.session.loggedIn) {
        res.send(`
            <div>
                <div>You are logged in</div>
                <a href="/logout">Logout</a>
            </div>
        `);
    } else {
        res.send(`
            <div>
                <div>You are not logged in</div>
                <a href="/login">Login</a>
            </div>
        `);
    }
});

router.get('/logout', (req: Request, res: Response) => {
    req.session = undefined;
    res.redirect('/');
});

router.get('/protected', requireAuth, (req: Request, res: Response) => {
    res.send('Welcome to protected route, logged in user');
})

export {router};